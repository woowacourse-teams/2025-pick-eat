package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.SseServerClient;

public class FakeRestaurantSseServerClient implements SseServerClient {


    @Override
    public void notifyRestaurantUpdated(String pickeatCode) {
        return;
    }
}
