package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.pickeat.domain.PickeatDeactivatedEvent;
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PickeatDeactivatedEventHandler {
    private final RestaurantRepository restaurantRepository;


    //TODO: 추후 관련 캐시, 엔티티 모두 삭제 기능 추가 + 완전 비동기 고려  (2025-10-17, 금, 16:57)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(PickeatDeactivatedEvent event) {
        restaurantRepository.deactivate(event.pickeatCode());
    }
}
