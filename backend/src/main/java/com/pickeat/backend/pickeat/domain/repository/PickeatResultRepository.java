package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.PickeatResult;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickeatResultRepository extends JpaRepository<PickeatResult, Long> {

    Optional<PickeatResult> findByPickeatId(Long pickeatId);

    List<PickeatResult> findByPickeatIdIn(List<Long> pickeatIds);
}
