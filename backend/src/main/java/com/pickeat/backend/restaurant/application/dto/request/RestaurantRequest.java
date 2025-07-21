package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Location;

public record RestaurantRequest(String name, FoodCategory category, Integer distance, String roadAddressName,
                                Location location, String placeUrl) {

}
