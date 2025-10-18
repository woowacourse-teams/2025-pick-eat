package com.pickeat.backend.tobe.restaurant.domain.repository;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;
import java.util.Optional;

public interface RestaurantRepository {
    Restaurant save(Restaurant restaurant);

    Optional<Restaurant> findById(Long id);

    List<Restaurant> findAllById(List<Long> ids);

    List<Restaurant> findByPickeatAndIsExcludedIfProvided(Pickeat pickeat, Boolean isExcluded);

    int deleteByPickeatIds(List<Long> pickeatIds);

    void bulkInsert(List<Restaurant> restaurants);

    void deactivate(PickeatCode pickeatCode);

    void saveAll(List<Restaurant> restaurants);
}
