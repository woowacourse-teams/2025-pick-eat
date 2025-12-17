package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findAllByPickeatIdAndIsExcluded(Long pickeatId, Boolean isExcluded);

    @Query("""
            select r from Restaurant r
            where r.pickeatId = :pickeatId
                and (:isExcluded IS NULL OR r.isExcluded = :isExcluded)
                and (:foodCategory IS NULL OR r.restaurantInfo.foodCategory = :foodCategory)
            """)
    List<Restaurant> findByPickeatIdAndIsExcludedAndFoodCategoryIfProvided(
            @Param("pickeatId") Long pickeatId,
            @Param("isExcluded") Boolean isExcluded,
            @Param("foodCategory") FoodCategory foodCategory);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE restaurant SET deleted = true WHERE pickeat_id IN (:pickeatIds)", nativeQuery = true)
    int deleteByPickeatIds(@Param("pickeatIds") List<Long> pickeatIds);

    List<Restaurant> findByPickeatIdIn(Collection<Long> pickeatIds);
}
