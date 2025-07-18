package com.pickeat.backend.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomCode;
import com.pickeat.backend.room.domain.repository.ParticipantRepository;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public RoomResponse createRoom(RoomRequest request) {
        Room room = new Room(
                request.name(),
                new Location(request.x(), request.y()),
                new Radius(request.radius())
        );

        Room saved = roomRepository.save(room);
        return RoomResponse.from(saved);
    }

    @Transactional
    public void deactivateRoom(String roomCode) {
        Room room = findRoomByCode(roomCode);
        room.deactivate();
    }

    @Transactional(readOnly = true)
    public ParticipantStateResponse getParticipantStateSummary(String roomCode) {
        Room room = findRoomByCode(roomCode);
        int eliminatedCount = participantRepository.countByRoomIdAndIsEliminationCompletedTrue(
                room.getId());
        return ParticipantStateResponse.of(room.getParticipantCount(), eliminatedCount);
    }

    private Room findRoomByCode(String roomCode) {
        RoomCode code = new RoomCode(roomCode);
        return roomRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }

    public RoomResponse getRoom(String roomCode) {
        Room room = roomRepository.findByCode(UUID.fromString(roomCode)).orElseThrow(() -> {
            throw new IllegalStateException("없는 방 코드 입니다.");
        });
        return RoomResponse.from(room);
    }
}
