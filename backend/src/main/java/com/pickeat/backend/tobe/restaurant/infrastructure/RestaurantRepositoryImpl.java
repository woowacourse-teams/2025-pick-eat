package com.pickeat.backend.tobe.restaurant.infrastructure;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantJpaRepository;
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

//TODO: 네이밍 고민쓰  (2025-10-17, 금, 13:59)
@Slf4j
@Repository
@RequiredArgsConstructor
public class RestaurantRepositoryImpl implements RestaurantRepository {
    private final RestaurantJpaRepository restaurantJpaRepository;
    private final RestaurantBulkJdbcRepository restaurantBulkJdbcRepository;

    @Override
    public Restaurant save(Restaurant restaurant) {
        return restaurantJpaRepository.save(restaurant);
    }

    @Override
    public Optional<Restaurant> findById(Long id) {
        return restaurantJpaRepository.findById(id);
    }

    @Override
    public List<Restaurant> findAllById(List<Long> ids) {
        return restaurantJpaRepository.findAllById(ids);
    }

    @Override
    @Cacheable(value = "restaurant", key = "#pickeat.code")
    public List<Restaurant> findByPickeatAndIsExcludedIfProvided(Pickeat pickeat, Boolean isExcluded) {
        return restaurantJpaRepository.findByPickeatAndIsExcludedIfProvided(pickeat, isExcluded);
    }

    @Override
    public int deleteByPickeatIds(List<Long> pickeatIds) {
        return restaurantJpaRepository.deleteByPickeatIds(pickeatIds);
    }

    @Override
    public void bulkInsert(List<Restaurant> restaurants) {
        restaurantBulkJdbcRepository.batchInsert(restaurants);
    }

    @CacheEvict(value = "restaurant", key = "#pickeatCode")
    public void deactivate(PickeatCode pickeatCode) {
        log.error("restaurant:{} 무효화", pickeatCode.getValue().toString());
    }

    @Override
    public void saveAll(List<Restaurant> restaurants) {
        restaurantJpaRepository.saveAll(restaurants);
    }
}
