package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantJpaRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepository {
    public static final String RESTAURANT_CACHE_NAME = "restaurant";
    private final RestaurantJpaRepository jpaRepository;
    private final RestaurantJdbcRepository jdbcRepository;

    @Override
    public void batchInsert(List<Restaurant> restaurants) {
        jdbcRepository.batchInsert(restaurants);
    }

    @Override
    @Cacheable(value = RESTAURANT_CACHE_NAME, key = "#pickeatId")
    public List<Restaurant> findByPickeatId(Long pickeatId) {
        return jpaRepository.findByPickeatId(pickeatId);
    }

    @Override
    public int deleteByPickeatIds(List<Long> pickeatIds) {
        return jpaRepository.deleteByPickeatIds(pickeatIds);
    }

    @Override
    public List<Restaurant> findIdsByPickeatIdIn(Collection<Long> pickeatIds) {
        return jpaRepository.findIdsByPickeatIdIn(pickeatIds);
    }

    @Override
    public void saveAll(List<Restaurant> restaurants) {
        jpaRepository.saveAll(restaurants);
    }

    @Override
    public Optional<Restaurant> findById(Long restaurantId) {
        return jpaRepository.findById(restaurantId);
    }

    @CacheEvict(value = RESTAURANT_CACHE_NAME, key = "#pickeat.id")
    public void evictRestaurantCache(Pickeat pickeat) {
        log.info("식당 캐시 무효화 | pickeatId: {}", pickeat.getId());
    }
}
