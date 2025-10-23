package com.pickeat.backend.pickeat.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import java.util.List;
import java.util.Optional;

public interface PickeatRepository {

    Optional<Pickeat> findByCode(PickeatCode pickeatCode);

    List<Pickeat> findByRoomId(Long roomId);

    List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive);

    List<Pickeat> findByRoomIdIn(List<Long> roomIds);

    Optional<Pickeat> findById(Long pickeatId);

    Pickeat save(Pickeat pickeat);
}
