package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.restaurant.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
