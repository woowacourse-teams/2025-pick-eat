package com.pickeat.backend.stress.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration
@RequiredArgsConstructor
public class StressRestaurantSearchClientConfiguration {

    @Bean
    public RestaurantSearchClient kakaoRestaurantSearchClient() {
        return new StressRestaurantSearchClient();
    }
}
