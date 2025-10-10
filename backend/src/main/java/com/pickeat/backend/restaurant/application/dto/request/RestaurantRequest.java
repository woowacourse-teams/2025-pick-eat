package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.wish.domain.Wish;

public record RestaurantRequest(
        String name,
        FoodCategory category,
        Integer distance,
        String roadAddressName,
        String placeUrl,
        String tags,
        String pictureKey,
        String pictureUrl,
        RestaurantType type
) {

    public static RestaurantRequest fromWish(Wish wish, String pictureKey, String pictureUrl) {
        return new RestaurantRequest(
                wish.getName(),
                wish.getFoodCategory(),
                null,
                wish.getRoadAddressName(),
                wish.getPlaceUrl(),
                pictureKey,
                pictureUrl,
                wish.getTags(),
                RestaurantType.WISH
        );
    }

    public static RestaurantRequest fromLocation(
            String name,
            FoodCategory category,
            Integer distance,
            String roadAddressName,
            String placeUrl,
            String tags
    ) {
        return new RestaurantRequest(
                name,
                category,
                distance,
                roadAddressName,
                placeUrl,
                tags,
                null,
                null,
                RestaurantType.LOCATION
        );
    }
}
