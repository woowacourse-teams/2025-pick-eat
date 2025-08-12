package com.pickeat.backend.restaurant.domain;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Restaurants {

    private final List<Restaurant> restaurants;

    public Restaurant getRandomRestaurant() {
        if (restaurants.isEmpty()) {
            throw new BusinessException(ErrorCode.RESTAURANTS_IS_EMPTY);
        }

        List<Restaurant> topRestaurants = getTopRestaurants();
        Collections.shuffle(topRestaurants);
        return topRestaurants.getFirst();
    }

    public boolean hasEqualLike() {
        if (restaurants.isEmpty()) {
            return false;
        }
        return getTopRestaurants().size() > 1;
    }

    private List<Restaurant> getTopRestaurants() {
        int maxLikeCount = getMaxLikeCount();
        if (maxLikeCount == 0) {
            return new ArrayList<>(restaurants);
        }

        return restaurants.stream()
                .filter(r -> r.getLikeCount() == maxLikeCount)
                .collect(Collectors.toList());
    }

    private int getMaxLikeCount() {
        return restaurants.stream()
                .map(Restaurant::getLikeCount)
                .max(Integer::compareTo)
                .orElse(0);
    }
}
