package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantJpaRepository extends JpaRepository<Participant, Long> {
    List<Participant> findByPickeatIdIn(List<Long> pickeatIds);

    List<Participant> findByPickeatId(Long pickeatId);
}
