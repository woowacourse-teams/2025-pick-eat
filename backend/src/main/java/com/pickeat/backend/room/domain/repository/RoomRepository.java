package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByCode(RoomCode uuid);

}
