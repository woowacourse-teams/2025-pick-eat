package com.pickeat.backend.tobe.wish.domain.repository;

import com.pickeat.backend.tobe.room.domain.Room;
import com.pickeat.backend.tobe.wish.domain.Wish;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findAllByRoom(Room room);
}
