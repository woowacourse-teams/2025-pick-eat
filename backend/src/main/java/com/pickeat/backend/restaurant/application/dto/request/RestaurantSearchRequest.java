package com.pickeat.backend.restaurant.application.dto.request;

public record RestaurantSearchRequest(String query, Double x, Double y, Integer radius, Integer size) {

}
