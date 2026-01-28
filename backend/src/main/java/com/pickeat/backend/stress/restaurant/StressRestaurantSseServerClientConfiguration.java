package com.pickeat.backend.stress.restaurant;

import com.pickeat.backend.restaurant.application.SseServerClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Profile({"stress"})
@Configuration
@RequiredArgsConstructor
public class StressRestaurantSseServerClientConfiguration {

    @Bean
    public SseServerClient restaurantSseServerClient() {
        log.warn("stress - StressRestaurantSseServerClientConfiguration 활성화");
        return new StressRestaurantSseServerClient();
    }
}
