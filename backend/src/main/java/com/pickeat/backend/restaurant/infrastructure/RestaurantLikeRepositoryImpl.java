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

    private final RestaurantLikeJpaRepository jpaRepository;

    @Override
    @Caching(evict = {
            @CacheEvict(value = "restaurant:like-count", key = "#restaurantLike.restaurantId"),
            @CacheEvict(value = "participant:likes", key = "#restaurantLike.participantId")
    })
    public RestaurantLike save(RestaurantLike restaurantLike) {
        return jpaRepository.save(restaurantLike);
    }

    @Override
    public boolean existsByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        return jpaRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Caching(evict = {
            @CacheEvict(value = "restaurant:like-count", key = "#restaurantId"),
            @CacheEvict(value = "participant:likes", key = "#participantId")
    })
    @Override
    public void deleteByRestaurantIdAndParticipantId(Long restaurantId, Long participantId) {
        jpaRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    @Override
    @Cacheable(value = "restaurant:like-count", key = "#restaurantId")
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
