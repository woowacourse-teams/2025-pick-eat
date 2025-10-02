package com.pickeat.backend.tobe.restaurant.application.request;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.tobe.wish.domain.Wish;

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

    public static RestaurantRequest fromWish(Wish wish) {
        RestaurantInfo restaurantInfo = wish.getRestaurantInfo();
        return new RestaurantRequest(
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory(),
                restaurantInfo.getDistance(),
                restaurantInfo.getRoadAddressName(),
                restaurantInfo.getPlaceUrl(),
                restaurantInfo.getPicture().getPictureKey(),
                restaurantInfo.getPicture().getPictureUrl(),
                restaurantInfo.getTags(),
                RestaurantType.WISH
        );
    }
}
