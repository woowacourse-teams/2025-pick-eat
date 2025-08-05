package com.pickeat.backend.restaurant.domain;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Restaurants {

    private final List<Restaurant> restaurants;

    public Restaurant getTopRestaurantByName() {
        if (restaurants.isEmpty()) {
            throw new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND);
        }

        List<Restaurant> topRestaurants = getTopRestaurants();
        return topRestaurants.stream()
                .sorted(Comparator.comparing(Restaurant::getName))
                .toList()
                .getFirst();
    }

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
