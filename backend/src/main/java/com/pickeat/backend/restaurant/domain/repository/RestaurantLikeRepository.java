package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantLikeRepository extends JpaRepository<RestaurantLike, Long> {

    boolean existsByParticipantIdAndRestaurantId(Long participantId, Long restaurantId);

    void deleteByParticipantIdAndRestaurantId(Long participantId, Long restaurantId);
}
