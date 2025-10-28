package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.TemplateRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

// Todo: 앞서 생성된 픽잇 삭제하는 작업에 대한 보상 필요[2025-09-25 17:33:13]
@Service
@RequiredArgsConstructor
public class RestaurantSearchFacade {

    private final LocationRestaurantSearchService locationRestaurantSearchService;
    private final WishRestaurantSearchService wishRestaurantSearchService;
    private final TemplateRestaurantSearchService templateRestaurantSearchService;
    private final RestaurantService restaurantService;


    public void searchByLocation(LocationRestaurantRequest request, String pickeatCode) {
        restaurantService.create(locationRestaurantSearchService.searchByLocation(request), pickeatCode);
    }

    public void searchByWish(WishRestaurantRequest request, String pickeatCode) {
        restaurantService.create(wishRestaurantSearchService.searchByWish(request), pickeatCode);
    }

    public void searchByTemplate(TemplateRestaurantRequest request, String pickeatCode) {
        restaurantService.create(templateRestaurantSearchService.searchByTemplate(request), pickeatCode);
    }
}
