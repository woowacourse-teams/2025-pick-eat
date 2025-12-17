package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class FakeRestaurantSearchClient implements RestaurantSearchClient {

    private final AtomicInteger called = new AtomicInteger(0);

    private volatile Function<RestaurantSearchRequest, List<RestaurantRequest>> behavior = this::defaultBehavior;

    @Override
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        called.incrementAndGet();
        return behavior.apply(request);
    }

    public int called() {
        return called.get();
    }

    public void willReturn(List<RestaurantRequest> value) {
        this.behavior = req -> value;
    }

    public void willThrow(RuntimeException e) {
        this.behavior = req -> {
            throw e;
        };
    }

    public void reset() {
        called.set(0);
        behavior = this::defaultBehavior;
    }

    private List<RestaurantRequest> defaultBehavior(RestaurantSearchRequest request) {
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
        return restaurants;
    }
}
