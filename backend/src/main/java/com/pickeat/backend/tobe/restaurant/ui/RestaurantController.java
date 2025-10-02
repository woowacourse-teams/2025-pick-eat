package com.pickeat.backend.tobe.restaurant.ui;

import com.pickeat.backend.tobe.restaurant.application.RestaurantSearchFacade;
import com.pickeat.backend.tobe.restaurant.application.request.WishRestaurantRequest;
import com.pickeat.backend.tobe.restaurant.ui.api.RestaurantApiSpec;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class RestaurantController implements RestaurantApiSpec {

    private final RestaurantSearchFacade restaurantSearchFacade;

    @Override
    @PostMapping("/pickeats/{pickeatCode}/restaurants/wish")
    public ResponseEntity<Void> createRestaurantsByWish(
            @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody WishRestaurantRequest request) {
        restaurantSearchFacade.searchByWish(request, pickeatCode);

        URI location = URI.create("/pickeats/" + pickeatCode + "/restaurants");
        return ResponseEntity.created(location).build();
    }
}
