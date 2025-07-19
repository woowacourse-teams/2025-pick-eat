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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
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

    public ParticipantStateResponse getParticipantStateSummary(String roomCode) {
        Room room = findRoomByCode(roomCode);
        int eliminatedCount = participantRepository.countEliminatedByRoom(room.getId(), true);
        return ParticipantStateResponse.of(room.getParticipantCount(), eliminatedCount);
    }

    public RoomResponse getRoom(String roomCode) {
        Room room = findRoomByCode(roomCode);
        return RoomResponse.from(room);
    }

    private Room findRoomByCode(String roomCode) {
        RoomCode code = new RoomCode(roomCode);
        return roomRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }
}
