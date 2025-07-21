package com.pickeat.backend.restaurant.domain;

import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Restaurants {
    private final List<Restaurant> restaurants;

    public List<Restaurant> getTopRestaurants() {
        if (restaurants.isEmpty()) {
            return List.of();
        }

        int maxLikeCount = getMaxLikeCount();
        if (maxLikeCount == 0) {
            return List.of();
        }

        return restaurants.stream()
                .filter(r -> r.getLikeCount() == maxLikeCount)
                .toList();
    }

    private int getMaxLikeCount() {
        return restaurants.stream()
                .map(Restaurant::getLikeCount)
                .max(Integer::compareTo)
                .orElse(0);
    }
}
