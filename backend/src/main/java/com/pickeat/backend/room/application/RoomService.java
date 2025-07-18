package com.pickeat.backend.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.application.support.RoomCodeParser;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
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
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(roomCode);
        Room room = findRoomByCode(parsedRoomCode);
        room.deactivate();
    }

    @Transactional(readOnly = true)
    public ParticipantStateResponse getParticipantStateSummary(String roomCode) {
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(roomCode);
        Room room = findRoomByCode(parsedRoomCode);
        int eliminatedCount = participantRepository.countByRoomIdAndIsEliminationCompletedTrue(
                room.getId());
        return ParticipantStateResponse.of(room.getParticipantCount(), eliminatedCount);
    }

    private Room findRoomByCode(UUID roomCode) {
        return roomRepository.findByCode(roomCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }
}
