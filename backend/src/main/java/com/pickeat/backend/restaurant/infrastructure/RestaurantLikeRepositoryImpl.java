package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RestaurantLikeRepositoryImpl implements RestaurantLikeRepository {

    private final RestaurantLikeJpaRepository jpaRepository;

    @Override
    @Caching(evict = {
            @CacheEvict(value = CacheNames.RESTAURANT_LIKE_COUNT, key = "#restaurantLike.restaurantId"),
            @CacheEvict(value = CacheNames.PARTICIPANT_LIKES, key = "#restaurantLike.participantId")
    })
    public RestaurantLike save(RestaurantLike restaurantLike) {
        return jpaRepository.save(restaurantLike);
    }

    @Override
    public boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        return jpaRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Caching(evict = {
            @CacheEvict(value = CacheNames.RESTAURANT_LIKE_COUNT, key = "#restaurantId"),
            @CacheEvict(value = CacheNames.PARTICIPANT_LIKES, key = "#participantId")
    })
    @Override
    public void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        jpaRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    @Cacheable(value = CacheNames.RESTAURANT_LIKE_COUNT, key = "#restaurantId")
    public Integer countByRestaurantId(Long restaurantId) {
        return jpaRepository.countByRestaurantId(restaurantId);
    }

    @Override
    @Cacheable(value = CacheNames.PARTICIPANT_LIKES, key = "#participantId")
    public List<RestaurantLike> findAllByParticipantId(Long participantId) {
        return jpaRepository.findAllByParticipantId(participantId);
    }
}
