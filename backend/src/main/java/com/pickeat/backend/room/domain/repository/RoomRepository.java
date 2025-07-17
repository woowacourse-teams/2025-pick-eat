package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Optional<Room> findByCode(UUID uuid);

}
