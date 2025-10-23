package com.pickeat.backend.tobe.room.domain.repository;

import com.pickeat.backend.room.domain.Room;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("RoomRepositoryV2")
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> getAllByIdIn(List<Long> roomIds);
}
