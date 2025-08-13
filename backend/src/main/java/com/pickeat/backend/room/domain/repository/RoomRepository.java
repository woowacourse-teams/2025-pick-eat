package com.pickeat.backend.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
