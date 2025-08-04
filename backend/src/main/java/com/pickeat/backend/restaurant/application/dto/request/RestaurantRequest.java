package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.wish.domain.Wish;

public record RestaurantRequest(String name, FoodCategory category, Integer distance, String roadAddressName,
                                Location location, String placeUrl, String tags, String pictureUrls,
                                RestaurantType type) {
    public static RestaurantRequest of(Wish wish, String pictureUrls) {
        return new RestaurantRequest(
                wish.getName(),
                wish.getFoodCategory(),
                null,
                wish.getRoadAddressName(),
                null,
                null,
                wish.getTags(),
                pictureUrls,
                RestaurantType.WISH
        );
    }
}
