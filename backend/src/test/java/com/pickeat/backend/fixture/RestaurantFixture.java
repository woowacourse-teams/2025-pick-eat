package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;

public class RestaurantFixture {

    public static Restaurant create(Long pickeatId) {
        return new Restaurant(
                "식당",
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                null,
                null,
                pickeatId
        );
    }

    public static Restaurant create(Long pickeatId, String name) {
        return new Restaurant(
                name,
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                null,
                null,
                pickeatId
        );
    }
}
