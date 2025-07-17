package com.pickeat.backend.room.application;

import com.pickeat.backend.room.application.dto.ParticipantRequest;
import com.pickeat.backend.room.application.dto.ParticipantResponse;
import com.pickeat.backend.room.domain.Participant;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.repository.ParticipantRepository;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;

    public ParticipantResponse createParticipant(ParticipantRequest request) {
        Room room = roomRepository.findRoomByCode(UUID.fromString(request.roomCode()))
                .orElseThrow(() -> new IllegalArgumentException("Room not found with code: " + request.roomCode()));
        Participant participant = new Participant(request.nickname(), room);
        Participant saved = participantRepository.save(participant);
        return ParticipantResponse.from(saved);
    }
}
