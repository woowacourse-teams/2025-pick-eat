package com.pickeat.backend.tobe.restaurant.infrastructure;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantLikeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RestaurantLikeRepositoryImpl implements RestaurantLikeRepository {
    private final RestaurantLikeJpaRepository restaurantLikeJpaRepository;

    @Override
    public RestaurantLike save(RestaurantLike restaurantLike) {
        return restaurantLikeJpaRepository.save(restaurantLike);
    }

    @Override
    public void deleteAll(List<RestaurantLike> likes) {
        restaurantLikeJpaRepository.deleteAll();
    }

    @Override
    public boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        return restaurantLikeJpaRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    public void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        restaurantLikeJpaRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    public List<RestaurantLike> findByRestaurantPickeatIdIn(List<Long> pickeatIds) {
        return restaurantLikeJpaRepository.findByRestaurantPickeatIdIn(pickeatIds);
    }
}
