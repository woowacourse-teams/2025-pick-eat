package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThatCode;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.restaurant.application.dto.RestaurantSearchRequest;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestClient;

@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@ActiveProfiles("test")
class KakaoClientConnectionTest {

    @Value("${external.kakao.map.restApiKey}")
    private String kakaoApiKey;

    @Disabled("외부 네트워크 요청이 일어나므로 비활성화")
    @Test
    void 실제_카카오_API_연동_테스트() {
        // given
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(10000);
        KakaoRestaurantSearchClient client = new KakaoRestaurantSearchClient(
                RestClient.builder()
                        .requestFactory(factory)
                        .baseUrl("https://dapi.kakao.com")
                        .defaultHeader("Authorization", "KakaoAK " + kakaoApiKey)
                        .defaultHeader("Content-Type", "application/json")
                        .build(),
                new ObjectMapper()
        );

        // when
        assertThatCode(() -> client.getRestaurants(
                new RestaurantSearchRequest("패스트푸드", 127.103068896795, 37.5152535228382, 200, 10)))
                .doesNotThrowAnyException();
    }


}
