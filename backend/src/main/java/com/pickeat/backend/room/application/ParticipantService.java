package com.pickeat.backend.room.application;

import com.pickeat.backend.room.application.dto.request.ParticipantRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantResponse;
import com.pickeat.backend.room.application.support.RoomCodeParser;
import com.pickeat.backend.room.domain.Participant;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.repository.ParticipantRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final RoomQueryService roomQueryService;

    @Transactional
    public ParticipantResponse createParticipant(ParticipantRequest request) {
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(request.roomCode());
        Room room = roomQueryService.findByCode(parsedRoomCode);
        room.incrementParticipantCount();

        Participant participant = new Participant(request.nickname(), room);
        Participant saved = participantRepository.save(participant);
        return ParticipantResponse.from(saved);
    }
}
