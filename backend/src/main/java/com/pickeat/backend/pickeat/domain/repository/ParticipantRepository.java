package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import java.util.List;
import java.util.Optional;

public interface ParticipantRepository {
    List<Participant> findByPickeatIdIn(List<Long> pickeatIds);

    List<Participant> findByPickeatId(Long pickeatId);

    Participant save(Participant participant);

    Optional<Participant> findById(Long participantId);
}
