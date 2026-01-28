package com.pickeat.backend.restaurant.infrastructure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Profile({"local", "dev", "prod"})
@Configuration
public class RestaurantSseServerClientConfig {

    @Bean
    public RestaurantSseServerClient restaurantSseServerClient(
            RestaurantSseServerProperties properties) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getConnectTimeout());
        factory.setReadTimeout(properties.getReadTimeout());

        RestClient restClient = RestClient.builder()
                .requestFactory(factory)
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("X-INTERNAL-API-KEY", properties.getRestApiKey())
                .defaultHeader("Content-Type", "application/json")
                .build();

        return new RestaurantSseServerClient(restClient);
    }
}
