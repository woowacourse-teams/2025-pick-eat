package com.pickeat.backend.restaurant.application.dto.request;

import java.util.List;

public record RestaurantExcludeRequest(List<Long> restaurantIds) {

}
