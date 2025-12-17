package com.pickeat.backend.restaurant.application.dto.request;

import com.pickeat.backend.restaurant.domain.RestaurantCategory;

public record RestaurantSearchRequest(RestaurantCategory restaurantCategory, Double x, Double y, Integer radius,
                                      Integer size) {

}
