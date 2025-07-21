package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Room;

public class RestaurantFixture {

    public static Restaurant create(Room room) {
        return new Restaurant(
                "식당",
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                new Location(127.103068896795, 37.5152535228382),
                room
        );
    }
}
