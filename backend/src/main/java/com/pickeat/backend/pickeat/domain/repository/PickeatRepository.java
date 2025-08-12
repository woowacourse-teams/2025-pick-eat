package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickeatRepository extends JpaRepository<Pickeat, Long> {

    Optional<Pickeat> findByCode(PickeatCode uuid);

    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);
}
