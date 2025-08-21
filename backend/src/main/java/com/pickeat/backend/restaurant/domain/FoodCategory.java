package com.pickeat.backend.restaurant.domain;

import java.util.Arrays;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FoodCategory {
    KOREAN("한식"),
    JAPANESE("일식"),
    CHINESE("중식"),
    WESTERN("양식"),
    OTHERS("기타");

    private final String name;

    public static FoodCategory getCategoryNameBy(String category) {
        return Arrays.stream(values())
                .filter(foodCategory -> category.contains(foodCategory.name))
                .findAny()
                .orElse(OTHERS);
    }
}
