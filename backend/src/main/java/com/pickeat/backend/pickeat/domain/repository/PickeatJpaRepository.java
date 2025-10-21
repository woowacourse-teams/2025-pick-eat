package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickeatJpaRepository extends JpaRepository<Pickeat, Long> {

    Optional<Pickeat> findByCode(PickeatCode pickeatCode);

    List<Pickeat> findByRoomId(Long rooId);

    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);

    List<Pickeat> findByRoomIdIn(List<Long> roodIds);

    List<Pickeat> findByUpdatedAtBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
