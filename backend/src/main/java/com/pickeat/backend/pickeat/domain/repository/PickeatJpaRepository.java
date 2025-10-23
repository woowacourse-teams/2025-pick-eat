package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PickeatJpaRepository extends JpaRepository<Pickeat, Long> {

    Optional<Pickeat> findByCode(PickeatCode pickeatCode);

    List<Pickeat> findByRoomId(Long roomId);

    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);

    List<Pickeat> findByRoomIdIn(List<Long> roomIds);

    List<Pickeat> findByUpdatedAtBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE pickeat SET deleted = true WHERE id IN :ids", nativeQuery = true)
    int bulkSoftDeleteByIdIn(@Param("ids") List<Long> ids);
}
