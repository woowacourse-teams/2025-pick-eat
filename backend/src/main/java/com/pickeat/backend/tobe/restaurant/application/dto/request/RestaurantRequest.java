package com.pickeat.backend.tobe.restaurant.application.dto.request;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.template.domain.TemplateWish;
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
        Picture picture = restaurantInfo.getPicture();
        return new RestaurantRequest(
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory(),
                restaurantInfo.getDistance(),
                restaurantInfo.getRoadAddressName(),
                restaurantInfo.getPlaceUrl(),
                restaurantInfo.getTags(),
                picture == null ? null : picture.getPictureKey(),
                picture == null ? null : picture.getPictureUrl(),
                RestaurantType.WISH
        );
    }

    public static RestaurantRequest fromTemplateWish(TemplateWish templateWish) {
        RestaurantInfo restaurantInfo = templateWish.getRestaurantInfo();
        Picture picture = restaurantInfo.getPicture();
        return new RestaurantRequest(
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory(),
                restaurantInfo.getDistance(),
                restaurantInfo.getRoadAddressName(),
                restaurantInfo.getPlaceUrl(),
                restaurantInfo.getTags(),
                picture == null ? null : picture.getPictureKey(),
                picture == null ? null : picture.getPictureUrl(),
                RestaurantType.TEMPLATE_WISH
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
