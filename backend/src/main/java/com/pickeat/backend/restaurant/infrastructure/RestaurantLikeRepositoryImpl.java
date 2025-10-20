package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import java.util.Collection;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RestaurantLikeRepositoryImpl implements RestaurantLikeRepository {

    public static final String RESTAURANT_LIKE_COUNT_CACHE_NAME = "restaurant:like-count";
    public static final String PARTICIPANT_LIKES_CACHE_NAME = "participant:likes";
    private final RestaurantLikeJpaRepository jpaRepository;

    @Override
    @Caching(evict = {
            @CacheEvict(value = RESTAURANT_LIKE_COUNT_CACHE_NAME, key = "#restaurantLike.restaurantId"),
            @CacheEvict(value = PARTICIPANT_LIKES_CACHE_NAME, key = "#restaurantLike.participantId")
    })
    public RestaurantLike save(RestaurantLike restaurantLike) {
        return jpaRepository.save(restaurantLike);
    }

    @Override
    public boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        return jpaRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Caching(evict = {
            @CacheEvict(value = RESTAURANT_LIKE_COUNT_CACHE_NAME, key = "#restaurantId"),
            @CacheEvict(value = PARTICIPANT_LIKES_CACHE_NAME, key = "#participantId")
    })
    @Override
    public void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        jpaRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    @Cacheable(value = RESTAURANT_LIKE_COUNT_CACHE_NAME, key = "#restaurantId")
    public Integer countAllByRestaurantId(Long restaurantId) {
        return jpaRepository.countAllByRestaurantId(restaurantId);
    }

    @Override
    public List<RestaurantLike> findByRestaurantIdIn(Collection<Long> restaurantIds) {
        return jpaRepository.findByRestaurantIdIn(restaurantIds);
    }

    @Override
    @Cacheable(value = "participant:likes", key = "#participantId")
    public List<RestaurantLike> findAllByParticipantId(Long participantId) {
        return jpaRepository.findAllByParticipantId(participantId);
    }
}
