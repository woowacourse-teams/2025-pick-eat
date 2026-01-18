package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class RestaurantUpdatedEventHandler {

    private final PickeatRepository pickeatRepository;
    private final SseServerClient sseServerClient;

    @TransactionalEventListener()
    void on(RestaurantUpdatedEvent restaurantUpdatedEvent) {
        String pickeatCode = pickeatRepository.findCodeById(restaurantUpdatedEvent.pickeatId());
        sseServerClient.notifyRestaurantUpdated(pickeatCode);
    }
}
