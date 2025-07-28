package com.pickeat.backend.restaurant.ui;

import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.ui.api.RestaurantApiSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController implements RestaurantApiSpec {

    private final RestaurantService restaurantService;

    @Override
    @PatchMapping("/exclude")
    public ResponseEntity<Void> excludeRestaurants(@RequestBody RestaurantExcludeRequest request) {
        restaurantService.exclude(request);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/{restaurantId}/like")
    public ResponseEntity<Void> likeRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        restaurantService.like(restaurantId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/{restaurantId}/unlike")
    public ResponseEntity<Void> cancelLikeRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        restaurantService.cancelLike(restaurantId);
        return ResponseEntity.noContent().build();
    }
}
