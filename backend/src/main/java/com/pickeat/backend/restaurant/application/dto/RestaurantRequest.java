package com.pickeat.backend.restaurant.application.dto;

import com.pickeat.backend.restaurant.domain.FoodCategory;

public record RestaurantRequest(String name, FoodCategory category, Integer distance, String roadAddressName, Double x,
                                Double y, String placeUrl) {

}
