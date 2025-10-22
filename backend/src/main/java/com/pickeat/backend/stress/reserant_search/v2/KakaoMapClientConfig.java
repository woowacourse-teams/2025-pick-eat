package com.pickeat.backend.stress.reserant_search.v2;

import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration("KakaoMapClientConfigV2")
@RequiredArgsConstructor
public class KakaoMapClientConfig {

    @Bean("RestaurantSearchClientV2")
    public RestaurantSearchClient kakaoRestaurantSearchClient() {
        System.out.println("dependency - StressRestaurantSearchClientV2");
        return new StressRestaurantSearchClientV2();
    }
}
