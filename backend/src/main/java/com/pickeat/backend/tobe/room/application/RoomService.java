package com.pickeat.backend.tobe.room.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.tobe.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.tobe.room.application.dto.request.RoomRequest;
import com.pickeat.backend.tobe.room.application.dto.response.RoomResponse;
import com.pickeat.backend.tobe.room.domain.repository.RoomRepository;
import com.pickeat.backend.tobe.room.domain.repository.RoomUserRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("RoomServiceV2")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public RoomResponse createRoom(RoomRequest request, Long userId) {
        Room room = new Room(request.name());
        roomRepository.save(room);
        roomUserRepository.save(new RoomUser(room.getId(), userId));
        return RoomResponse.of(room, 1);
    }

    public RoomResponse getRoom(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);

        Room room = getRoomById(roomId);
        return RoomResponse.of(room, getRoomUserCount(room));
    }

    public List<RoomResponse> getAllRoom(Long userId) {
        List<Long> roomIds = roomUserRepository.getAllRoomIdListByUserId(userId);
        List<Room> rooms = roomRepository.getAllByIdIn(roomIds);

        if (rooms.isEmpty()) {
            return List.of();
        }

        Map<Long, Integer> countMap = roomUserRepository.countByRoomIdList(roomIds).stream()
                .collect(Collectors.toMap(RoomUserRepository.RoomUserCount::getRoomId,
                        RoomUserRepository.RoomUserCount::getCnt));

        return rooms.stream()
                .map(room -> RoomResponse.of(
                        room,
                        countMap.getOrDefault(room.getId(), 0)
                ))
                .toList();
    }

    @Transactional
    public void inviteUsers(Long roomId, Long userId, RoomInvitationRequest request) {
        validateUserAccessToRoom(roomId, userId);

        Set<Long> invitedUserIds = new HashSet<>(request.userIds());

        Set<Long> existingIds = new HashSet<>(
                roomUserRepository.findExistingUserIdListInRoom(roomId, invitedUserIds)
        );

        List<RoomUser> roomUsers = invitedUserIds.stream()
                .filter(invitedUserId -> !existingIds.contains(invitedUserId))
                .map(checkedUserId -> new RoomUser(roomId, checkedUserId))
                .toList();

        roomUserRepository.saveAll(roomUsers);
    }

    @Transactional
    public void exitRoom(Long roomId, Long userId) {
        roomUserRepository.deleteByRoomIdAndUserId(roomId, userId);
    }

    private int getRoomUserCount(Room room) {
        return roomUserRepository.countByRoomId(room.getId());
    }

    private Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.ROOM_ACCESS_DENIED);
        }
    }
}
