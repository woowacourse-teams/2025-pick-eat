package com.pickeat.backend.tobe.wish.domain.repository;

import com.pickeat.backend.tobe.room.domain.Room;
import com.pickeat.backend.tobe.wish.domain.Wish;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("WishRepositoryV2")
public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findAllByRoom(Room room);
}
