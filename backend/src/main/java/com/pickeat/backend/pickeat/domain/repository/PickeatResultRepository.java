package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.PickeatResult;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PickeatResultRepository extends JpaRepository<PickeatResult, Long> {

    Optional<PickeatResult> findByPickeatId(Long pickeatId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE pickeat_result SET deleted = true WHERE pickeat_id IN :pickeatIds",
            nativeQuery = true)
    int bulkSoftDeleteByPickeatIdIn(@Param("pickeatIds") List<Long> pickeatIds);
}
