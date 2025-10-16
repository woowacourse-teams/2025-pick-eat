package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Cacheable(
            value = "restaurant",
            key = "#pickeat.id + '_' + (#isExcluded != null ? #isExcluded.toString() : 'null')"
    )
    @Query("""
            select r from Restaurant r
            where (r.pickeat = :pickeat)
                and (:isExcluded IS NULL OR r.isExcluded = :isExcluded)
            """)
    List<Restaurant> findByPickeatAndIsExcludedIfProvided(@Param("pickeat") Pickeat pickeat,
                                                          @Param("isExcluded") Boolean isExcluded);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE restaurant SET deleted = true WHERE pickeat_id IN (:pickeatIds)", nativeQuery = true)
    int deleteByPickeatIds(@Param("pickeatIds") List<Long> pickeatIds);
}
