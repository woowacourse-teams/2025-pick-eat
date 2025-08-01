package com.pickeat.backend.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public RoomResponse createRoom(RoomRequest request, Long userId) {
        Room room = new Room(request.name());
        roomRepository.save(room);
        roomUserRepository.save(new RoomUser(room, userId));
        return RoomResponse.from(room);
    }

    public RoomResponse getRoom(Long roomId) {
        Room room = getRoomByRoomId(roomId);
        return RoomResponse.from(room);
    }

    public List<RoomResponse> getAllRoom(Long userId) {
        List<Room> rooms = roomUserRepository.getAllRoomByUserId(userId);
        return RoomResponse.from(rooms);
    }

    public void inviteUsers(Long roomId, RoomInvitationRequest request) {
        Room room = getRoomByRoomId(roomId);
        //TODO: User 객체로 변환 작업하기  (2025-08-1, 금, 15:45)
        List<Long> userIds = request.userIds();

        List<RoomUser> roomUsers = userIds.stream()
                .map(userId -> new RoomUser(room, userId))
                .toList();

        roomUserRepository.saveAll(roomUsers);
    }

    private Room getRoomByRoomId(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }
}
