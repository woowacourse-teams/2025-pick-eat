package com.pickeat.backend.restaurant.ui;

import com.pickeat.backend.restaurant.application.RestaurantSearchService;
import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.ui.api.RestaurantApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class RestaurantController implements RestaurantApiSpec {

    private final RestaurantService restaurantService;
    private final RestaurantSearchService restaurantSearchService;

    @Override
    @PostMapping("/pickeats/{pickeatCode}/restaurants/location")
    public ResponseEntity<Void> createRestaurantsByLocaion(
            @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody LocationRestaurantRequest request) {
        List<RestaurantRequest> restaurantRequests = restaurantSearchService.searchByLocation(request);
        restaurantService.create(restaurantRequests, pickeatCode);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Override
    @PostMapping("/pickeats/{pickeatCode}/restaurants/wish")
    public ResponseEntity<Void> createRestaurantsByLocaion(
            @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody WishRestaurantRequest request) {
        List<RestaurantRequest> restaurantRequests = restaurantSearchService.searchByWish(request);
        restaurantService.create(restaurantRequests, pickeatCode);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @Override
    @PatchMapping("/restaurants/exclude")
    public ResponseEntity<Void> excludeRestaurants(@RequestBody RestaurantExcludeRequest request) {
        restaurantService.exclude(request);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/restaurants/{restaurantId}/like")
    public ResponseEntity<Void> likeRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        restaurantService.like(restaurantId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/restaurants/{restaurantId}/unlike")
    public ResponseEntity<Void> cancelLikeRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        restaurantService.cancelLike(restaurantId);
        return ResponseEntity.noContent().build();
    }


    @Override
    @GetMapping("/pickeats/{pickeatCode}/restaurants")
    public ResponseEntity<List<RestaurantResponse>> getPickeatRestaurants(
            @PathVariable("pickeatCode") String pickeatCode,
            @RequestParam(required = false) Boolean isExcluded) {
        List<RestaurantResponse> response = restaurantService.getPickeatRestaurants(pickeatCode, isExcluded);
        return ResponseEntity.ok().body(response);
    }
}
