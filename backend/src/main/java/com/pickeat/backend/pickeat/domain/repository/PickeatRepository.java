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

public interface PickeatRepository extends JpaRepository<Pickeat, Long> {

    Optional<Pickeat> findByCode(PickeatCode uuid);

    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);

    @Modifying
    @Query(value = """
                DELETE FROM pickeat
                WHERE is_active = false
                AND updated_at < :cutoffDate
            """, nativeQuery = true)
    int deleteOldDeactivatedPickeats(@Param("cutoffDate") LocalDateTime cutoffDate);

    @Query(value = """
                SELECT COUNT(*) FROM pickeat
                WHERE is_active = false
                AND updated_at < :cutoffDate
            """, nativeQuery = true)
    int countOldDeactivatedPickeats(@Param("cutoffDate") LocalDateTime cutoffDate);
}
