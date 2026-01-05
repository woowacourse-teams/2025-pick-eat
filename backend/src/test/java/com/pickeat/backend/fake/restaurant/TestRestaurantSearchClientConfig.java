package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.infrastructure.FailoverRestaurantSearchClientGateway;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
public class TestRestaurantSearchClientConfig {

    @Bean(name = "kakaoRestaurantSearchClient")
    public FakeRestaurantSearchClientGateway kakaoRestaurantSearchClient() {
        return new FakeRestaurantSearchClientGateway();
    }

    @Bean(name = "googleRestaurantSearchClient")
    public FakeRestaurantSearchClientGateway googleRestaurantSearchClient() {
        return new FakeRestaurantSearchClientGateway();
    }

    @Bean
    @Primary
    public RestaurantSearchClient restaurantSearchClient(
            @Qualifier("kakaoRestaurantSearchClient") RestaurantSearchClient primary,
            @Qualifier("googleRestaurantSearchClient") RestaurantSearchClient secondary,
            MeterRegistry meterRegistry
    ) {
        return new FailoverRestaurantSearchClientGateway(primary, secondary, meterRegistry);
    }
}
