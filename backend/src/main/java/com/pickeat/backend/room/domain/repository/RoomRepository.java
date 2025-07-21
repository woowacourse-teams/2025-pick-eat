package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

//TODO: default 메서드로 getById 쓰면 안되나?  (2025-07-21, 월, 20:48)
public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByCode(RoomCode uuid);

}
