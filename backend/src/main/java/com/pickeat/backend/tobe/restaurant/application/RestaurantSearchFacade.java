package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("RestaurantSearchFacadeV2")
@RequiredArgsConstructor
public class RestaurantSearchFacade {

    private final LocationRestaurantSearchService locationRestaurantSearchService;
    private final WishRestaurantSearchService wishRestaurantSearchService;
    private final RestaurantService restaurantService;

    public void searchByLocation(LocationRestaurantRequest request, String pickeatCode) {
        restaurantService.create(locationRestaurantSearchService.searchByLocation(request), pickeatCode);
    }

    // Todo: 앞서 생성된 픽잇 삭제하는 작업에 대한 보상 필요[2025-09-25 17:33:13]
    public void searchByWish(WishRestaurantRequest request, String pickeatCode) {
        restaurantService.create(wishRestaurantSearchService.searchByWish(request), pickeatCode);
    }
}
