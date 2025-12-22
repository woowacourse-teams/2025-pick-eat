package com.pickeat.backend.restaurant.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Profile({"prod", "dev", "local", "stress"})
@Configuration
@RequiredArgsConstructor
public class GoogleMapClientConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public RestaurantSearchClient googleRestaurantSearchClient(GoogleMapApiProperties googleMapApiProperties) {
        SimpleClientHttpRequestFactory simpleClientHttpRequestFactory = new SimpleClientHttpRequestFactory();
        simpleClientHttpRequestFactory.setReadTimeout(googleMapApiProperties.getReadTimeout());
        simpleClientHttpRequestFactory.setConnectTimeout(googleMapApiProperties.getConnectTimeout());

        RestClient restClient = RestClient.builder()
                .requestFactory(simpleClientHttpRequestFactory)
                .baseUrl(googleMapApiProperties.getBaseUrl())
                .defaultHeader("X-Goog-Api-Key", googleMapApiProperties.getRestApiKey())
                .defaultHeader("Content-Type", "application/json")
                .build();

        return new GoogleRestaurantSearchClient(restClient, objectMapper);
    }
}
