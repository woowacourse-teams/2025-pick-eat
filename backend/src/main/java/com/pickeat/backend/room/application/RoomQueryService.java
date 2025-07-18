package com.pickeat.backend.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomQueryService {
    
    private final RoomRepository roomRepository;
    
    public Room findByCode(UUID roomCode) {
        return roomRepository.findByCode(roomCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }
}
