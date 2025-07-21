package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import java.util.List;

public interface RestaurantSearchClient {
    List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request);
}
