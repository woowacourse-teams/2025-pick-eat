package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatDeactivatedEvent;
import com.pickeat.backend.restaurant.infrastructure.RestaurantRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PickeatDeactivatedEventHandler {
    private final RestaurantRepositoryImpl restaurantRepositoryImpl;
    private final PickeatRepositoryImpl pickeatRepositoryImpl;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PickeatDeactivatedEvent event) {
        Pickeat pickeat = event.pickeat();
        restaurantRepositoryImpl.evictRestaurantCache(pickeat);
        pickeatRepositoryImpl.evictPickeatCache(pickeat);
    }
}
