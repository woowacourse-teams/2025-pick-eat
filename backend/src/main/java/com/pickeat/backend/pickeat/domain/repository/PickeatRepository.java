package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickeatRepository extends JpaRepository<Pickeat, Long> {

    @Cacheable(
            value = "pickeat",
            key = "'code_' + #uuid.toString()"
    )
    Optional<Pickeat> findByCode(PickeatCode uuid);

    @Cacheable(
            value = "pickeat",
            key = "'room_' + #roomId"
    )
    List<Pickeat> findByRoomId(Long roomId);

    @Cacheable(
            value = "pickeat",
            key = "'room_' + #roomId + '_active_' + (#isActive != null ? #isActive.toString() : 'null')"
    )
    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);

    @Cacheable(
            value = "pickeat",
            key = "'rooms_' + #roomIds.toString()"
    )
    List<Pickeat> findByRoomIdIn(List<Long> roomIds);

    // 날짜 범위 조회는 캐싱하지 않는 것을 권장 (시간에 따라 계속 변하는 데이터)
    List<Pickeat> findByUpdatedAtBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
