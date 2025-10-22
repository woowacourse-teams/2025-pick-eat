package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RestaurantLikeRepositoryImpl implements RestaurantLikeRepository {

    private final RestaurantLikeJpaRepository jpaRepository;

    @Override
    public RestaurantLike save(RestaurantLike restaurantLike) {
        return jpaRepository.save(restaurantLike);
    }

    @Override
    public boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        return jpaRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    public void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        jpaRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }
}
