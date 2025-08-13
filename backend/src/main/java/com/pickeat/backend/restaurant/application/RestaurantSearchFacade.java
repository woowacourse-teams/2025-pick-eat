package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantSearchFacade {

    private final LocationRestaurantSearchService locationRestaurantSearchService;
    private final WishRestaurantSearchService wishRestaurantSearchService;
    private final RestaurantService restaurantService;

    public void searchByLocation(LocationRestaurantRequest request, String pickeatCode) {
        restaurantService.create(locationRestaurantSearchService.searchByLocation(request), pickeatCode);
    }

    public void searchByWish(WishRestaurantRequest request, String pickeatCode) {
        restaurantService.create(wishRestaurantSearchService.searchByWish(request), pickeatCode);
    }
}
