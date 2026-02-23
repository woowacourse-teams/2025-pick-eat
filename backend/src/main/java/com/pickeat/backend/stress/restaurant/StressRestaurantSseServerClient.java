package com.pickeat.backend.stress.restaurant;

import com.pickeat.backend.restaurant.application.SseServerClient;

public class StressRestaurantSseServerClient implements SseServerClient {


    @Override
    public void notifyRestaurantUpdated(String pickeatCode) {
        return;
    }
}
