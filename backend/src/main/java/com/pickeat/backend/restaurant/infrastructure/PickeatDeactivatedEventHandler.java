package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.pickeat.domain.PickeatDeactivatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PickeatDeactivatedEventHandler {
    private final RestaurantRepositoryImpl restaurantRepositoryImpl;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PickeatDeactivatedEvent event) {
        restaurantRepositoryImpl.evictRestaurantCache(event.pickeat());
    }
}
