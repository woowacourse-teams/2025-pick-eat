package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.Collection;
import java.util.List;

public interface RestaurantLikeRepository {

    boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    Integer countAllByRestaurantId(Long restaurantId);

    List<RestaurantLike> findByRestaurantIdIn(Collection<Long> restaurantIds);

    List<RestaurantLike> findAllByParticipantId(Long participantId);

    RestaurantLike save(RestaurantLike restaurantLike);
}
