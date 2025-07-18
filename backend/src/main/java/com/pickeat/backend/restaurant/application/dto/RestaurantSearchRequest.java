package com.pickeat.backend.restaurant.application.dto;

public record RestaurantSearchRequest(String query, Double x, Double y, Integer radius, Integer size) {
}
