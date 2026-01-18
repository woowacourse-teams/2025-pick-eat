package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.restaurant.application.SseServerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestClient;

@RequiredArgsConstructor
public class RestaurantSseServerClient implements SseServerClient {

    private final RestClient restClient;

    @Override
    public void notifyRestaurantUpdated(String pickeatCode) {
        restClient.post()
                .uri("/internal/sse/pickeat/{pickeatCode}", pickeatCode)
                .retrieve()
                .toBodilessEntity();
    }
}
