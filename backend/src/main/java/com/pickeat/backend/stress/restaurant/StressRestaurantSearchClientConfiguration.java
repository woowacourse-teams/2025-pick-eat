package com.pickeat.backend.stress.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Profile({"stress"})
@Configuration
@RequiredArgsConstructor
public class StressRestaurantSearchClientConfiguration {

    @Bean
    public RestaurantSearchClient kakaoRestaurantSearchClient() {
        log.warn("stress - StressLoginConfiguration 활성화");
        return new StressRestaurantSearchClient();
    }
}
