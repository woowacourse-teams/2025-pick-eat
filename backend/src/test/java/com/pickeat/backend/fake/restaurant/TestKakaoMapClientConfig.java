package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
public class TestKakaoMapClientConfig {

    @Bean
    public RestaurantSearchClient restaurantSearchClient() {
        return new FakeRestaurantSearchClient();
    }
}

