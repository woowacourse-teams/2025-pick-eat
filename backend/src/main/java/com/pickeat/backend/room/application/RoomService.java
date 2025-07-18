package com.pickeat.backend.room.application;

import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
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
    private final RoomQueryService roomQueryService;

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

    @Transactional(readOnly = true)
    public ParticipantStateResponse getParticipantStateSummary(String roomCode) {
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(roomCode);
        Room room = roomQueryService.findByCode(parsedRoomCode);
        int eliminatedCount = participantRepository.countByRoomIdAndIsEliminationCompletedTrue(
                room.getId());
        return ParticipantStateResponse.of(room.getParticipantCount(), eliminatedCount);
    }

    @Transactional
    public void deactivateRoom(String roomCode) {
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(roomCode);
        Room room = roomQueryService.findByCode(parsedRoomCode);
        room.deactivate();
    }
}
