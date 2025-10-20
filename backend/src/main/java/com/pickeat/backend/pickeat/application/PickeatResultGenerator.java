package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
class PickeatResultGenerator {

    public Restaurant generate(Map<Restaurant, Integer> likeCounts) {
        validateNotEmpty(likeCounts);

        List<Restaurant> topRatedRestaurants = getTopRatedRestaurants(likeCounts);
        Collections.shuffle(topRatedRestaurants);

        return topRatedRestaurants.getFirst();
    }

    private void validateNotEmpty(Map<Restaurant, Integer> likeCounts) {
        if (likeCounts.isEmpty()) {
            throw new BusinessException(ErrorCode.RESTAURANTS_IS_EMPTY);
        }
    }

    private List<Restaurant> getTopRatedRestaurants(Map<Restaurant, Integer> likeCounts) {
        int maxLikeCount = getMaxLikeCount(likeCounts);

        if (maxLikeCount == 0) {
            return new ArrayList<>(likeCounts.keySet());
        }

        return likeCounts.entrySet().stream()
                .filter(entry -> entry.getValue() == maxLikeCount)
                .map(Map.Entry::getKey)
                .collect(Collectors.toCollection(ArrayList::new));
    }

    private int getMaxLikeCount(Map<Restaurant, Integer> likeCounts) {
        return likeCounts.values().stream()
                .max(Integer::compareTo)
                .orElse(0);
    }
}
