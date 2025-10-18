package com.pickeat.backend.restaurant.ui;

import com.pickeat.backend.global.auth.ParticipantInfo;
import com.pickeat.backend.global.auth.annotation.ParticipantInPickeat;
import com.pickeat.backend.restaurant.application.RestaurantSearchFacade;
import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.ui.api.RestaurantApiSpec;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Deprecated
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RestaurantController implements RestaurantApiSpec {

    private final RestaurantService restaurantService;
    private final RestaurantSearchFacade restaurantSearchFacade;

    @Override
    @PostMapping("/pickeats/{pickeatCode}/restaurants/location")
    public ResponseEntity<Void> createRestaurantsByLocation(
            @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody LocationRestaurantRequest request) {
        restaurantSearchFacade.searchByLocation(request, pickeatCode);

        URI location = URI.create("/pickeats/" + pickeatCode + "/restaurants");
        return ResponseEntity.created(location).build();
    }

    @Override
    @PostMapping("/pickeats/{pickeatCode}/restaurants/wish")
    public ResponseEntity<Void> createRestaurantsByWish(
            @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody WishRestaurantRequest request) {
        restaurantSearchFacade.searchByWish(request, pickeatCode);

        URI location = URI.create("/pickeats/" + pickeatCode + "/restaurants");
        return ResponseEntity.created(location).build();
    }

    @Override
    @PatchMapping("/restaurants/exclude")
    public ResponseEntity<Void> excludeRestaurants(
            @RequestBody RestaurantExcludeRequest request,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        restaurantService.exclude(request, participantInfo);
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/restaurants/{restaurantId}/like")
    public ResponseEntity<Void> likeRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        restaurantService.like(restaurantId, participantInfo.id());
        return ResponseEntity.noContent().build();
    }

    @Override
    @PatchMapping("/restaurants/{restaurantId}/unlike")
    public ResponseEntity<Void> cancelLikeRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        restaurantService.cancelLike(restaurantId, participantInfo.id());
        return ResponseEntity.noContent().build();
    }


    @Override
    @GetMapping("/pickeats/{pickeatCode}/restaurants")
    public ResponseEntity<List<RestaurantResponse>> getPickeatRestaurants(
            @PathVariable("pickeatCode") String pickeatCode,
            @RequestParam(required = false) Boolean isExcluded,
            @ParticipantInPickeat ParticipantInfo participantInfo
    ) {
        List<RestaurantResponse> response = restaurantService.getPickeatRestaurants(pickeatCode, isExcluded,
                participantInfo.id());
        return ResponseEntity.ok().body(response);
    }
}
