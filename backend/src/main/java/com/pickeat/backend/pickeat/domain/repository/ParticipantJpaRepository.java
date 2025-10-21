package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParticipantJpaRepository extends JpaRepository<Participant, Long> {

    List<Participant> findByPickeatId(Long pickeatId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE participant SET deleted = true WHERE pickeat_id IN :pickeatIds",
            nativeQuery = true)
    int bulkSoftDeleteByPickeatIdIn(@Param("pickeatIds") List<Long> pickeatIds);
}
