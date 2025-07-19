package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    int countByRoomIdAndIsEliminationCompleted(Long roomId, Boolean completed);

    default int countEliminatedByRoom(Long roomId, Boolean completed) {
        return countByRoomIdAndIsEliminationCompleted(roomId, completed);
    }
}
