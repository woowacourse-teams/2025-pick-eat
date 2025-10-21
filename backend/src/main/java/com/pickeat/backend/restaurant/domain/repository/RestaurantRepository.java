package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface RestaurantRepository {

    void batchInsert(List<Restaurant> restaurants);

    List<Restaurant> findByPickeatId(Long pickeatId);

    int deleteByPickeatIds(List<Long> pickeatIds);

    List<Restaurant> findIdsByPickeatIdIn(Collection<Long> pickeatIds);

    void saveAll(List<Restaurant> restaurants);

    Optional<Restaurant> findById(Long restaurantId);
}
