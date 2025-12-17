package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fake.restaurant.FakeRestaurantSearchClient;
import com.pickeat.backend.fake.restaurant.TestRestaurantSearchClientConfig;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantCategory;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Import;
import org.springframework.web.client.ResourceAccessException;

@SpringBootTest(webEnvironment = WebEnvironment.NONE, classes = FailoverRestaurantSearchClientTest.TestApp.class)
class FailoverRestaurantSearchClientTest {

    private static final RestaurantSearchRequest REQ = new RestaurantSearchRequest(RestaurantCategory.KOREAN, 1.0, 1.0,
            100, 20);

    @SpringBootConfiguration
    @EnableAutoConfiguration
    @Import({
            ResiliencePolicyConfig.class,
            TestRestaurantSearchClientConfig.class
    })
    static class TestApp {

    }

    @Autowired
    @Qualifier("kakaoRestaurantSearchClient")
    FakeRestaurantSearchClient primaryRestaurantSearchClient;

    @Autowired
    @Qualifier("googleRestaurantSearchClient")
    FakeRestaurantSearchClient secondaryRestaurantSearchClient;

    @Autowired
    RestaurantSearchClient failoverRestaurantSearchClient;

    @BeforeEach
    void resetState() {
        primaryRestaurantSearchClient.reset();
        secondaryRestaurantSearchClient.reset();

        cbRegistry.circuitBreaker("kakaoSearch").reset();
    }

    @Nested
    class 정상적인_상황 {

        @Test
        void 정상호출이면_primary만_호출된다() {
            //given
            primaryRestaurantSearchClient.willReturn(List.of(dummy("kakao")));
            secondaryRestaurantSearchClient.willReturn(List.of(dummy("google")));

            List<RestaurantRequest> result = failoverRestaurantSearchClient.getRestaurants(REQ);

            //when & then
            assertAll(
                    () -> assertThat(result).extracting(RestaurantRequest::name).containsExactly("kakao"),
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(1),
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(0)
            );
        }
    }


    @Nested
    class 비정상적인_상황 {

        @Test
        void 응답이_429면_secondary로_fallback된다() {
            //given
            primaryRestaurantSearchClient.willThrow(new ExternalApiException("rate limit", "kakao", 429));
            secondaryRestaurantSearchClient.willReturn(List.of(dummy("google")));

            //when
            List<RestaurantRequest> result = failoverRestaurantSearchClient.getRestaurants(REQ);

            //then
            assertAll(
                    () -> assertThat(result).extracting(RestaurantRequest::name).containsExactly("google"),
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(1),
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(1)
            );
        }

        @Test
        void 응답이_5xx면_retry_후_secondary로_fallback된다() {
            // given
            primaryRestaurantSearchClient.willThrow(new ExternalApiException("server error", "kakao", 503));
            secondaryRestaurantSearchClient.willReturn(List.of(dummy("google")));

            // when
            List<RestaurantRequest> result = failoverRestaurantSearchClient.getRestaurants(REQ);

            // then
            assertAll(
                    () -> assertThat(result).extracting(RestaurantRequest::name).containsExactly("google"),
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(2),   // maxAttempts=2
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(1)
            );
        }


        @Test
        void 응답이_4xx면_fallback하지_않고_그대로_throw된다() {
            // given
            primaryRestaurantSearchClient.willThrow(new ExternalApiException("bad request", "kakao", 400));

            // when & then
            assertThatThrownBy(() -> failoverRestaurantSearchClient.getRestaurants(REQ))
                    .isInstanceOf(ExternalApiException.class);

            assertAll(
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(1),
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(0)
            );
        }
    }

    @Nested
    class 비정상적인_상황_Timeout {

        @Test
        void ResourceAccessException이면_retry_후_secondary로_fallback된다() {
            // given
            primaryRestaurantSearchClient.willThrow(new ResourceAccessException("read timed out"));
            secondaryRestaurantSearchClient.willReturn(List.of(dummy("google")));

            // when
            List<RestaurantRequest> result = failoverRestaurantSearchClient.getRestaurants(REQ);

            // then
            assertAll(
                    () -> assertThat(result).extracting(RestaurantRequest::name).containsExactly("google"),
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(2),   // maxAttempts=2
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(1)
            );
        }
    }

    @Nested
    class 비정상적인_상황_CircuitBreaker {

        @Test
        void 서킷이_OPEN이면_primary_호출없이_secondary로_fallback된다() {
            // given
            secondaryRestaurantSearchClient.willReturn(List.of(dummy("google")));
            cbRegistry.circuitBreaker("kakaoSearch").transitionToOpenState();

            // when
            List<RestaurantRequest> result = failoverRestaurantSearchClient.getRestaurants(REQ);

            // then
            assertAll(
                    () -> assertThat(result).extracting(RestaurantRequest::name).containsExactly("google"),
                    () -> assertThat(primaryRestaurantSearchClient.called()).isEqualTo(0),
                    () -> assertThat(secondaryRestaurantSearchClient.called()).isEqualTo(1)
            );
        }
    }

    @Autowired
    io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry cbRegistry;
    @Autowired
    io.github.resilience4j.retry.RetryRegistry retryRegistry;

    @Test
    void 적용된_설정_확인() {
        var cb = cbRegistry.circuitBreaker("kakaoSearch");
        System.out.println("CB windowSize=" + cb.getCircuitBreakerConfig().getSlidingWindowSize());
        System.out.println("CB minCalls=" + cb.getCircuitBreakerConfig().getMinimumNumberOfCalls());

        var r = retryRegistry.retry("kakaoSearch");
        System.out.println("Retry maxAttempts=" + r.getRetryConfig().getMaxAttempts());
    }

    private static RestaurantRequest dummy(String name) {
        return RestaurantRequest.fromLocation(
                name,
                FoodCategory.KOREAN,
                120,
                "서울특별시 강남구 테헤란로 123",
                "https://example.com",
                "분식,가성비"
        );
    }
}
