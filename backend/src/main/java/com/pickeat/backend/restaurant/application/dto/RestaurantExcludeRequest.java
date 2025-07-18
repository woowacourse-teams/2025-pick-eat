package com.pickeat.backend.restaurant.application.dto;

import java.util.List;

public record RestaurantExcludeRequest(List<Long> restaurantIds) {

}
