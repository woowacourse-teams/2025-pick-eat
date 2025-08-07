package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike, Long> {

    boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);
}
