package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.tobe.restaurant.infrastructure.LoadTestRestaurantSearchClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("load")
@Configuration
public class LoadTestKakaoMapClientConfig {

    @Bean
    public RestaurantSearchClient restaurantSearchClient() {
        return new LoadTestRestaurantSearchClient();
    }
}

