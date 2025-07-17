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
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public ParticipantResponse createParticipant(ParticipantRequest request) {
        Room room = roomRepository.findByCode(UUID.fromString(request.roomCode()))
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        room.incrementParticipantCount();

        Participant participant = new Participant(request.nickname(), room);
        Participant saved = participantRepository.save(participant);
        return ParticipantResponse.from(saved);
    }
}
