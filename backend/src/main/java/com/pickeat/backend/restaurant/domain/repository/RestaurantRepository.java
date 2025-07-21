package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.room.domain.Room;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByRoomAndIsExcluded(Room room, Boolean isExcluded);

    List<Restaurant> findAllByRoom(Room room);
}
