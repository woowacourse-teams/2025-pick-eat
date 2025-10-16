package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    @Cacheable(
            value = "participant",
            key = "#pickeatIds.toString()"
    )
    List<Participant> findByPickeatIdIn(List<Long> pickeatIds);

    @Cacheable(
            value = "participant",
            key = "'pickeat_' + #pickeat.id"
    )
    List<Participant> findByPickeat(Pickeat pickeat);
}
