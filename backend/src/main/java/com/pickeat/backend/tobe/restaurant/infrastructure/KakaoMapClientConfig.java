package com.pickeat.backend.tobe.restaurant.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Profile("!test")
@Configuration("KakaoMapClientConfigV2")
@RequiredArgsConstructor
public class KakaoMapClientConfig {

    private final ObjectMapper objectMapper;

    @Bean("RestaurantSearchClientV2")
    public RestaurantSearchClient kakaoRestaurantSearchClient(
            KakaoMapApiProperties properties) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getConnectTimeout());
        factory.setReadTimeout(properties.getReadTimeout());

        RestClient restClient = RestClient.builder()
                .requestFactory(factory)
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("Authorization", "KakaoAK " + properties.getRestApiKey())
                .defaultHeader("Content-Type", "application/json")
                .build();

        return new KakaoRestaurantSearchClient(restClient, objectMapper);
    }
}
