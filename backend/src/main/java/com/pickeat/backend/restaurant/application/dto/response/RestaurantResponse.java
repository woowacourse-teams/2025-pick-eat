package com.pickeat.backend.restaurant.application.dto.response;

import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;

public record RestaurantResponse(
        long id,
        String name,
        String category,
        int distance,
        String roadAddressName,
        int likeCount,
        double x,
        double y) {

    public static RestaurantResponse from(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getFoodCategory().getName(),
                restaurant.getDistance(),
                restaurant.getRoadAddressName(),
                restaurant.getLikeCount(),
                restaurant.getLocation().getX(),
                restaurant.getLocation().getY());
    }

    public static List<RestaurantResponse> from(List<Restaurant> restaurants) {
        return restaurants.stream()
                .map(RestaurantResponse::from)
                .toList();
    }
}