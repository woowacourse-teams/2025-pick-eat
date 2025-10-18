package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantLikeJpaRepository extends JpaRepository<RestaurantLike, Long> {

    boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    List<RestaurantLike> findByRestaurantPickeatIdIn(List<Long> pickeatIds);

}
