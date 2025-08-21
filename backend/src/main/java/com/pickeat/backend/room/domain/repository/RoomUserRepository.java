package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {

    List<RoomUser> findAllByUserId(Long userId);

    List<RoomUser> findAllByRoomId(Long roomId);

    default List<Room> getAllRoomByUserId(Long userId) {
        return findAllByUserId(userId).stream()
                .map(RoomUser::getRoom)
                .toList();
    }

    default List<User> getAllUserByRoomId(Long roomId) {
        return findAllByRoomId(roomId).stream()
                .map(RoomUser::getUser)
                .toList();
    }

    List<RoomUser> findAllByRoom(Room room);

    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
}
