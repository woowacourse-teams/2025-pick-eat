package com.pickeat.backend.tobe.room.domain.repository;

import com.pickeat.backend.tobe.room.domain.Room;
import com.pickeat.backend.tobe.room.domain.RoomUser;
import com.pickeat.backend.tobe.user.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("RoomUserRepositoryV2")
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

    List<RoomUser> user(User user);

    void deleteByRoomIdAndUserId(Long roomId, Long userId);
}
