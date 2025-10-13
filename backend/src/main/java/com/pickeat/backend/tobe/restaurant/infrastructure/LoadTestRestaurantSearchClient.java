package com.pickeat.backend.tobe.restaurant.infrastructure;

import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class LoadTestRestaurantSearchClient implements RestaurantSearchClient {

    private static final Integer RESTAURANT_SIZE = 5;

    @Override
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        List<RestaurantRequest> restaurants = new ArrayList<>();
        for (int i = 0; i < RESTAURANT_SIZE; i++) {
            restaurants.add(RestaurantRequest.fromLocation(
                    request.query() + "음식" + i,
                    FoodCategory.getCategoryNameBy(request.query()),
                    ThreadLocalRandom.current().nextInt(0, request.radius() + 1),
                    "도로명 주소" + i,
                    "식당 URL" + i,
                    "태그" + i
            ));
        }
        return restaurants;
    }
}
