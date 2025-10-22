package com.pickeat.backend.restaurant.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Profile({"local", "dev", "prod"})
@Configuration
@RequiredArgsConstructor
public class KakaoMapClientConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public KakaoRestaurantSearchClient kakaoRestaurantSearchClient(KakaoMapApiProperties properties) {
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
