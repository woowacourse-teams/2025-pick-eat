package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PickeatResultRepository extends JpaRepository<PickeatResult, Long> {

    Optional<PickeatResult> findByPickeat(Pickeat pickeat);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select pr from PickeatResult pr where pr.pickeat = :pickeat")
    Optional<PickeatResult> findByPickeatWithPessimisticLock(@Param("pickeat") Pickeat pickeat);

}
