package com.pickeat.backend.global.stress.reserant_search.v1;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration
@RequiredArgsConstructor
public class KakaoMapClientConfig {

    @Bean
    public RestaurantSearchClient stressRestaurantSearchClient() {
        System.out.println("dependency - StressRestaurantSearchClientV1");
        return new StressRestaurantSearchClientV1();
    }
}
