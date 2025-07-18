package com.pickeat.backend.restaurant.ui;

import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PatchMapping("/exclude")
    public void excludeRestaurants(
            @RequestBody RestaurantExcludeRequest request
    ) {
        restaurantService.exclude(request);
    }
}
