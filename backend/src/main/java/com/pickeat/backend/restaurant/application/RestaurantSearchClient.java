package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.RestaurantSearchRequest;
import java.util.List;

public interface RestaurantSearchClient {
    List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request);
}
