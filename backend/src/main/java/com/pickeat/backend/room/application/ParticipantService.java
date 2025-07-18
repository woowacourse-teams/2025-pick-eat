package com.pickeat.backend.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.ParticipantRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantResponse;
import com.pickeat.backend.room.application.support.RoomCodeParser;
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

    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public ParticipantResponse createParticipant(ParticipantRequest request) {
        UUID parsedRoomCode = RoomCodeParser.parseRoomCode(request.roomCode());
        Room room = findRoomByCode(parsedRoomCode);
        room.incrementParticipantCount();

        Participant participant = new Participant(request.nickname(), room);
        Participant saved = participantRepository.save(participant);
        return ParticipantResponse.from(saved);
    }

    private Room findRoomByCode(UUID roomCode) {
        return roomRepository.findByCode(roomCode)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }
}
