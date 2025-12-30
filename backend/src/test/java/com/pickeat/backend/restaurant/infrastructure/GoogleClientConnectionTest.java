package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThatCode;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.RestaurantCategory;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Disabled("외부 네트워크 요청이 일어나므로 비활성화")
@SpringBootTest(webEnvironment = WebEnvironment.NONE)
public class GoogleClientConnectionTest {

    @Value("${external.google.map.restApiKey}")
    private String googleApiKey;

    @Test
    void 실제_구글_API_연동_테스트() {
        SimpleClientHttpRequestFactory simpleClientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        simpleClientHttpRequestFactory.setConnectTimeout(3000);
        simpleClientHttpRequestFactory.setReadTimeout(10000);

        GoogleRestaurantSearchClient googleRestaurantSearchClient = new GoogleRestaurantSearchClient(
                RestClient.builder()
                        .requestFactory(simpleClientHttpRequestFactory)
                        .baseUrl("https://places.googleapis.com")
                        .defaultHeader("X-Goog-Api-Key", googleApiKey)
                        .defaultHeader("Content-Type", "application/json")
                        .build(),
                new ObjectMapper()
        );

        assertThatCode(() -> googleRestaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, 127.103068896795, 37.5152535228382, 200, 10)))
                .doesNotThrowAnyException();
    }
}
