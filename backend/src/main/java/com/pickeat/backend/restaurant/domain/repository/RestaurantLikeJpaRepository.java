package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantLikeJpaRepository extends JpaRepository<RestaurantLike, Long> {

    boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    Integer countAllByRestaurantId(Long restaurantId);

    List<RestaurantLike> findAllByParticipantId(Long participantId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE restaurant_like SET deleted = true WHERE restaurant_id IN :restaurantIds",
            nativeQuery = true)
    int bulkSoftDeleteByRestaurantIdIn(@Param("restaurantIds") List<Long> restaurantIds);
}
