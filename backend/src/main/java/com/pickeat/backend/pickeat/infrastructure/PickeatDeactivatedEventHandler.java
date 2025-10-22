package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.pickeat.domain.PickeatDeactivatedEvent;
import com.pickeat.backend.restaurant.infrastructure.RestaurantRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PickeatDeactivatedEventHandler {

    //Todo: 인메모리 도입 / Impl 참조의 이유 [2025-10-21 16:44:20]
    private final RestaurantRepositoryImpl restaurantRepositoryImpl;
    private final PickeatRepositoryImpl pickeatRepositoryImpl;
    private final ParticipantRepositoryImpl participantRepositoryImpl;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PickeatDeactivatedEvent event) {
        restaurantRepositoryImpl.evictRestaurantCache(event.pickeatId());
        pickeatRepositoryImpl.evictPickeatCache(event.pickeatCode());
        participantRepositoryImpl.evictParticipantCache(event.pickeatId());
    }
}
