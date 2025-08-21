package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PickeatService {

    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public PickeatResponse createPickeatWithoutRoom(PickeatRequest request) {
        Pickeat pickeat = Pickeat.createWithoutRoom(request.name());

        pickeatRepository.save(pickeat);
        return PickeatResponse.from(pickeat);
    }

    @Transactional
    public PickeatResponse createPickeatWithRoom(Long roomId, Long userId, PickeatRequest request) {
        validateUserAccessToRoom(roomId, userId);

        Pickeat pickeat = Pickeat.createWithRoom(request.name(), roomId);

        pickeatRepository.save(pickeat);
        return PickeatResponse.from(pickeat);
    }

    @Transactional
    public void deactivatePickeat(String pickeatCode, Long participantId) {
        validateParticipantAccessToPickeat(participantId, pickeatCode);
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        pickeat.deactivate();
    }

    public ParticipantStateResponse getParticipantStateSummary(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        int eliminatedCount = participantRepository.countEliminatedByPickeat(pickeat.getId(), true);
        return ParticipantStateResponse.of(pickeat.getParticipantCount(), eliminatedCount);
    }

    public PickeatResponse getPickeat(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        return PickeatResponse.from(pickeat);
    }

    public PickeatStateResponse getPickeatState(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        return PickeatStateResponse.from(pickeat);
    }
    
    public List<PickeatResponse> getActivePickeatInRoom(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);
        List<Pickeat> pickeats = pickeatRepository.findByRoomIdAndIsActive(roomId, true);
        return PickeatResponse.from(pickeats);
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.ROOM_ACCESS_DENIED);
        }
    }

    private void validateParticipantAccessToPickeat(Long participantId, String pickeatCode) {
        Participant participant = getParticipant(participantId);
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        if (!participant.getPickeat().equals(pickeat)) {
            throw new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);
        }
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        PickeatCode code = new PickeatCode(pickeatCode);
        return pickeatRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }
}
