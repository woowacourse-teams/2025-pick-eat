package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.SseServerClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"test"})
@Configuration
public class FakeRestaurantSseServerClientConfig {

    @Bean
    public SseServerClient restaurantSseServerClient() {
        return new FakeRestaurantSseServerClient();
    }
}
