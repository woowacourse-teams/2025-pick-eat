package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByPickeatAndIsExcluded(Pickeat pickeat, Boolean isExcluded);

    @Query("""
            select r from Restaurant r
            where (r.pickeat = :pickeat)
                and (:isExcluded IS NULL OR r.isExcluded = :isExcluded)
            """)
    List<Restaurant> findByPickeatAndIsExcludedIfProvided(@Param("pickeat") Pickeat pickeat,
                                                          @Param("isExcluded") Boolean isExcluded);

    @Modifying
    @Query(value = """
                DELETE FROM restaurant
                WHERE pickeat_id IN (
                    SELECT id FROM pickeat
                    WHERE is_active = false
                    AND updated_at < :cutoffDate
                )
            """, nativeQuery = true)
    int deleteAllByOldDeactivatedPickeats(@Param("cutoffDate") LocalDateTime cutoffDate);
}
