package com.pickeat.backend.stress.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

public class StressRestaurantSearchClient implements RestaurantSearchClient {

    private static final int GENERAL_PROCESSING_TIME = 70;

    @Override
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {

        long startTime = System.nanoTime();

        List<RestaurantRequest> restaurants = new ArrayList<>();
        for (int i = 0; i < request.size(); i++) {
            restaurants.add(RestaurantRequest.fromLocation(
                    request.restaurantCategory().getKoreanName() + "음식" + i,
                    FoodCategory.getCategoryNameBy(request.restaurantCategory().getKoreanName()),
                    ThreadLocalRandom.current().nextInt(0, request.radius() + 1),
                    "도로명 주소" + i,
                    "식당 URL" + i,
                    "태그" + i
            ));
        }

        long endTime = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startTime);
        long remainingTime = GENERAL_PROCESSING_TIME - endTime;

        if (remainingTime > 0) {
            try {
                Thread.sleep(remainingTime);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        return restaurants;
    }
}
