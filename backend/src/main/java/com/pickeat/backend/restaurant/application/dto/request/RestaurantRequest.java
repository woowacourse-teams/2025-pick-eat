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
        String pictureUrls,
        RestaurantType type
) {

    /**
     * Create a RestaurantRequest populated from a Wish with type RestaurantType.WISH.
     *
     * The resulting request copies name, category, and roadAddressName from the provided Wish;
     * distance and placeUrl are set to null; tags is set from wish.getPlaceUrl(); pictureUrls is set
     * from wish.getTags(); and type is set to RestaurantType.WISH.
     *
     * @param wish the source Wish to convert into a RestaurantRequest
     * @param pictureUrls an unused parameter retained for API compatibility
     * @return a RestaurantRequest constructed from the provided Wish with type WISH
     */
    public static RestaurantRequest fromWish(Wish wish, String pictureUrls) {
        return new RestaurantRequest(
                wish.getName(),
                wish.getFoodCategory(),
                null,
                wish.getRoadAddressName(),
                null,
                wish.getPlaceUrl(),
                wish.getTags(),
                RestaurantType.WISH
        );
    }

    /**
     * Create a RestaurantRequest from explicit location data.
     *
     * The resulting request will have `pictureUrls` set to null and `type` set to `RestaurantType.LOCATION`.
     *
     * @param name            the restaurant name
     * @param category        the food category
     * @param distance        the distance to the restaurant in unspecified units, or null if unknown
     * @param roadAddressName the road address of the restaurant
     * @param placeUrl        a URL for the place, or null if unavailable
     * @param tags            comma- or delimiter-separated tags associated with the place, or null if none
     * @return                a RestaurantRequest populated with the provided location data
     */
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
                RestaurantType.LOCATION
        );
    }
}
