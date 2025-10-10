package com.pickeat.backend.tobe.fake.restaurant;

import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration("TestKakaoMapClientConfigV2")
public class TestKakaoMapClientConfig {

    @Bean("RestaurantSearchClientV2")
    public RestaurantSearchClient restaurantSearchClient() {
        return new FakeRestaurantSearchClient();
    }
}

