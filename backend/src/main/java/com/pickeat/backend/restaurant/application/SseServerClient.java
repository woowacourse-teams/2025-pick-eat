package com.pickeat.backend.restaurant.application;

public interface SseServerClient {

    void notifyRestaurantUpdated(String message);
}
