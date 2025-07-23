package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.room.domain.Room;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByRoomAndIsExcluded(Room room, Boolean isExcluded);

    @Query("""
            select r from Restaurant r
            where (r.room = :room)
                and (:isExcluded IS NULL OR r.isExcluded = :isExcluded)
            """)
    List<Restaurant> findByRoomAndIsExcludedIfProvided(@Param("room") Room room,
                                                       @Param("isExcluded") Boolean isExcluded);
}
