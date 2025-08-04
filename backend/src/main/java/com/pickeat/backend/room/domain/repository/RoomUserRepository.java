package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    List<RoomUser> findAllByUserId(Long userId);

    default List<Room> getAllRoomByUserId(Long userId) {
        return findAllByUserId(userId).stream()
                .map(RoomUser::getRoom)
                .toList();
    }

    List<RoomUser> findAllByRoom(Room room);

    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
}
