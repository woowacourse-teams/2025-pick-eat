package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.pickeat.domain.ParticipantStateUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ParticipantStateUpdatedEventHandler {
    private final ParticipantRepositoryImpl participantRepositoryImpl;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handle(ParticipantStateUpdatedEvent event) {
        Long pickeatId = event.pickeatId();
        participantRepositoryImpl.evictParticipantCache(pickeatId);
    }
}
