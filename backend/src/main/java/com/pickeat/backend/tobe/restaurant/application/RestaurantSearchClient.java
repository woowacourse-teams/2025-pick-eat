package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import java.util.List;

public interface RestaurantSearchClient {

    List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request);
}
