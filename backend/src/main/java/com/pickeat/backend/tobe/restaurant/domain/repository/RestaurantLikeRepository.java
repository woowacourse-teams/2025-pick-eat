package com.pickeat.backend.tobe.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.List;

public interface RestaurantLikeRepository {

    RestaurantLike save(RestaurantLike restaurantLike);

    void deleteAll(List<RestaurantLike> likes);

    boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId);

    List<RestaurantLike> findByRestaurantPickeatIdIn(List<Long> pickeatIds);
}
