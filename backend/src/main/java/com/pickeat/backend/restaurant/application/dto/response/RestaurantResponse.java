package com.pickeat.backend.restaurant.application.dto.response;

import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.Arrays;
import java.util.List;

public record RestaurantResponse(
        long id,
        String name,
        String category,
        List<String> tags,
        int distance,
        String placeUrl,
        String roadAddressName,
        int likeCount,
        boolean isExcluded,
        double x,
        double y) {

    public static RestaurantResponse from(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getFoodCategory().getName(),
                parseTags(restaurant.getTags()),
                restaurant.getDistance(),
                restaurant.getPlaceUrl(),
                restaurant.getRoadAddressName(),
                restaurant.getLikeCount(),
                restaurant.getIsExcluded(),
                restaurant.getLocation().getX(),
                restaurant.getLocation().getY());
    }

    public static List<RestaurantResponse> from(List<Restaurant> restaurants) {
        return restaurants.stream()
                .map(RestaurantResponse::from)
                .toList();
    }

    private static List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(tags.split(","))
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .toList();
    }
}
