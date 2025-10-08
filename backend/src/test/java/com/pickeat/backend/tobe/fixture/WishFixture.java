package com.pickeat.backend.tobe.fixture;

import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.tobe.wish.domain.Wish;

public class WishFixture {

    public static Wish create(Room room) {
        return new Wish(room, RestaurantInfoFixture.create("test_restaurant"));
    }

    public static Wish create(Room room, RestaurantInfo restaurantInfo) {
        return new Wish(room, restaurantInfo);
    }

    public static Wish create(Room room, Picture picture) {
        return new Wish(room, RestaurantInfoFixture.create("test_restaurant", picture));
    }
}
