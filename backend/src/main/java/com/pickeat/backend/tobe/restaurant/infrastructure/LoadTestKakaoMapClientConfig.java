package com.pickeat.backend.tobe.restaurant.infrastructure;

import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("stress")
@Configuration("KakaoMapClientConfigV2")
public class LoadTestKakaoMapClientConfig {

    @Bean("RestaurantSearchClientV2")
    public RestaurantSearchClient restaurantSearchClient() {
        return new LoadTestRestaurantSearchClient();
    }
}

