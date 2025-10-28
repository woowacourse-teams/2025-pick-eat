package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.template.domain.TemplateWish;
import com.pickeat.backend.wish.domain.Wish;

public record RestaurantRequest(
        String name,
        FoodCategory category,
        Integer distance,
        String roadAddressName,
        String placeUrl,
        String tags,
        String pictureKey,
        String pictureUrl
) {

    public static RestaurantRequest fromWish(Wish wish) {
        RestaurantInfo restaurantInfo = wish.getRestaurantInfo();
        return createRestaurantRequest(restaurantInfo);
    }

    public static RestaurantRequest fromTemplateWish(TemplateWish templateWish) {
        RestaurantInfo restaurantInfo = templateWish.getRestaurantInfo();
        return createRestaurantRequest(restaurantInfo);
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
                null
        );
    }

    private static RestaurantRequest createRestaurantRequest(RestaurantInfo restaurantInfo) {
        Picture picture = restaurantInfo.getPicture();
        return new RestaurantRequest(
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory(),
                restaurantInfo.getDistance(),
                restaurantInfo.getRoadAddressName(),
                restaurantInfo.getPlaceUrl(),
                restaurantInfo.getTags(),
                picture == null ? null : picture.getPictureKey(),
                picture == null ? null : picture.getPictureUrl()
        );
    }
}
