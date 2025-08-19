package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    int countByPickeatIdAndIsEliminationCompleted(Long pickeatId, Boolean completed);

    default int countEliminatedByPickeat(Long pickeatId, Boolean completed) {
        return countByPickeatIdAndIsEliminationCompleted(pickeatId, completed);
    }

    List<Participant> findByPickeatIdIn(List<Long> pickeatIds);
}
