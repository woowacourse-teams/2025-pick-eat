package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.pickeat.backend.global.exception.ExternalApiException;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class RestaurantSseServerClientTest {

    private final RestClient.Builder testBuilder = RestClient.builder().baseUrl("https://sse.pickeat.com");
    private final MockRestServiceServer mockServer = MockRestServiceServer.bindTo(testBuilder).build();
    private final RestaurantSseServerClient restaurantSseServerClient = new RestaurantSseServerClient(
            testBuilder.build());

    @Nested
    class 식당_갱신_알림_케이스 {

        @Test
        void 정상_응답이면_예외없이_알림을_전송한다() {
            // given
            mockServer.expect(requestTo("https://sse.pickeat.com/internal/sse/pickeat/ABCD1234"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withSuccess());

            // when & then
            assertThatCode(() -> restaurantSseServerClient.notifyRestaurantUpdated("ABCD1234"))
                    .doesNotThrowAnyException();
        }

        @Test
        void SSE_서버가_에러_응답을_반환하면_ExternalApiException을_던진다() {
            // given
            mockServer.expect(requestTo("https://sse.pickeat.com/internal/sse/pickeat/ABCD1234"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withStatus(HttpStatus.INTERNAL_SERVER_ERROR));

            // when & then
            assertThatThrownBy(() -> restaurantSseServerClient.notifyRestaurantUpdated("ABCD1234"))
                    .isInstanceOf(ExternalApiException.class);
        }
    }
}
