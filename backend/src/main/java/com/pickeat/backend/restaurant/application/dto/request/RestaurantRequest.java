package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.restaurant.domain.FoodCategory;

public record RestaurantRequest(String name, FoodCategory category, Integer distance, String roadAddressName,
                                Location location, String placeUrl, String tags) {

}
