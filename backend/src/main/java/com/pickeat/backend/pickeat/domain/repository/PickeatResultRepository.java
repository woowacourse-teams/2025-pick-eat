package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickeatResultRepository extends JpaRepository<PickeatResult, Long> {

    Optional<PickeatResult> findByPickeat(Pickeat pickeat);
}
