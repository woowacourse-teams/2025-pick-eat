package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantType;

public class RestaurantFixture {

    public static Restaurant create(Pickeat pickeat) {
        return new Restaurant(
                "식당",
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                new Location(127.103068896795, 37.5152535228382),
                null,
                RestaurantType.LOCATION,
                pickeat
        );
    }

    public static Restaurant create(Pickeat pickeat, String name) {
        return new Restaurant(
                name,
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                new Location(127.103068896795, 37.5152535228382),
                null,
                RestaurantType.LOCATION,
                pickeat
        );
    }
}
