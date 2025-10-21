package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantJpaRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByPickeatId(Long pickeatId);

    List<Restaurant> findByPickeatIdIn(Collection<Long> pickeatIds);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE restaurant SET deleted = true WHERE pickeat_id IN :pickeatIds", nativeQuery = true)
    int bulkSoftDeleteByPickeatIdIn(@Param("pickeatIds") List<Long> pickeatIds);
}
