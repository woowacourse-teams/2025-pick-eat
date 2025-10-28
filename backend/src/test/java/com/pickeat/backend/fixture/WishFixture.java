package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.wish.domain.Wish;

public class WishFixture {

    public static Wish create(Long roomId) {
        return new Wish(roomId, RestaurantInfoFixture.create("test_restaurant"));
    }

    public static Wish create(Long roomId, RestaurantInfo restaurantInfo) {
        return new Wish(roomId, restaurantInfo);
    }

    public static Wish create(Long roomId, Picture picture) {
        return new Wish(roomId, RestaurantInfoFixture.create("test_restaurant", picture));
    }
}
