package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
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
        Pickeat pickeat = pickeatRepository.findById(restaurantUpdatedEvent.pickeatId())
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));

        sseServerClient.notifyRestaurantUpdated(pickeat.getCode().getValue().toString());
    }
}
