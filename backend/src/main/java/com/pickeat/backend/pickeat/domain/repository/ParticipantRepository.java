package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    int countByPickeatIdAndIsCompleted(Long pickeatId, Boolean completed);

    default int countCompletedByPickeat(Long pickeatId, Boolean completed) {
        return countByPickeatIdAndIsCompleted(pickeatId, completed);
    }

    List<Participant> findByPickeatIdIn(List<Long> pickeatIds);
}
