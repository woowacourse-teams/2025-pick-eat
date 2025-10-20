package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatRejoinAvailableResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.room.domain.Room;
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
        List<Participant> participants = participantRepository.findByPickeatId(pickeat.getId());
        return ParticipantStateResponse.from(participants);
    }

    public PickeatResponse getPickeatByParticipant(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        return PickeatResponse.from(pickeat);
    }

    public PickeatStateResponse getPickeatState(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        return PickeatStateResponse.from(pickeat);
    }

    public List<PickeatResponse> getPickeatInRoom(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);
        List<Pickeat> pickeats = pickeatRepository.findByRoomId(roomId);
        return PickeatResponse.from(pickeats);
    }

    public List<PickeatResponse> getActivePickeatInRoom(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);
        List<Pickeat> pickeats = pickeatRepository.findByRoomIdAndIsActive(roomId, true);
        return PickeatResponse.from(pickeats);
    }

    public PickeatRejoinAvailableResponse getRejoinAvailableToPickeat(String pickeatCode, Long participantId) {
        if (participantId == null) {
            return new PickeatRejoinAvailableResponse(false);
        }
        //TODO: 한번만 쿼리가 나가도록 할 수 있지 않을까?  (2025-10-20, 월, 17:44)
        Participant participant = getParticipant(participantId);
        Pickeat pickeat = getPickeatByParticipant(participant);
        Boolean rejoinAvailable = pickeat.isEqualPickeatCode(pickeatCode);
        return new PickeatRejoinAvailableResponse(rejoinAvailable);
    }

    public List<PickeatResponse> getPickeatsByUser(Long userId) {
        List<Room> allRoom = roomUserRepository.getAllRoomByUserId(userId);
        List<Long> allRoomIds = allRoom.stream().map(Room::getId).toList();
        List<Pickeat> roomPickeats = pickeatRepository.findByRoomIdIn(allRoomIds);
        return PickeatResponse.from(roomPickeats);
    }

    public PickeatResponse getPickeatsByParticipant(Long participantId) {
        Participant participant = getParticipant(participantId);
        Pickeat pickeat = getPickeatByParticipant(participant);
        return PickeatResponse.from(pickeat);
    }

    private Pickeat getPickeatByParticipant(Participant participant) {
        return pickeatRepository.findById(participant.getPickeatId())
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.ROOM_ACCESS_DENIED);
        }
    }

    private void validateParticipantAccessToPickeat(Long participantId, String pickeatCode) {
        Participant participant = getParticipant(participantId);
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        if (!participant.getPickeatId().equals(pickeat.getId())) {
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
