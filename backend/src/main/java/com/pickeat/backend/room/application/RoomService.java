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
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomUserRepository roomUserRepository;
    private final WishListRepository wishListRepository;

    @Transactional
    public RoomResponse createRoom(RoomRequest request, Long userId) {
        Room room = new Room(request.name());
        User user = getUserById(userId);
        roomRepository.save(room);
        roomUserRepository.save(new RoomUser(room, user));

        WishList wishList = createWishList(room);
        return RoomResponse.of(room, getRoomUserCount(room), wishList.getId());
    }

    public RoomResponse getRoom(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);

        Room room = getRoomById(roomId);
        long wishListId = getWishListId(roomId);
        return RoomResponse.of(room, getRoomUserCount(room), wishListId);
    }

    public List<RoomResponse> getAllRoom(Long userId) {
        List<Room> rooms = roomUserRepository.getAllRoomByUserId(userId);
        return rooms.stream()
                .map(room -> RoomResponse.of(room, getRoomUserCount(room), getWishListId(room.getId())))
                .toList();
    }

    @Transactional
    public void inviteUsers(Long roomId, Long userId, RoomInvitationRequest request) {
        validateUserAccessToRoom(roomId, userId);

        Room room = getRoomById(roomId);
        Set<Long> userIds = new HashSet<>(request.userIds());
        List<User> users = userIds
                .stream()
                .map(this::getUserById)
                .toList();

        List<RoomUser> roomUsers = users.stream()
                .map(user -> new RoomUser(room, user))
                .filter(roomUser -> !roomUserRepository.existsByRoomIdAndUserId(roomUser.getRoom().getId(),
                        roomUser.getUser().getId()))
                .toList();

        roomUserRepository.saveAll(roomUsers);
    }

    @Transactional
    public void exitRoom(Long roomId, Long userId) {
        roomUserRepository.deleteByRoomIdAndUserId(roomId, userId);
    }

    private WishList createWishList(Room room) {
        WishList wishList = new WishList(room.getName(), room.getId(), false);
        wishListRepository.save(wishList);
        return wishList;
    }

    private long getWishListId(Long roomId) {
        WishList wishList = wishListRepository.findByRoomIdAndIsTemplate(roomId, false)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_LIST_NOT_FOUND));
        return wishList.getId();
    }

    private int getRoomUserCount(Room room) {
        return roomUserRepository.findAllByRoom(room).size();
    }

    private Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.ROOM_ACCESS_DENIED);
        }
    }
}
