package com.pickeat.backend.pickeat.ui;

import com.pickeat.backend.pickeat.application.PickeatService;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.ui.api.PickeatApiSpec;
import com.pickeat.backend.restaurant.application.RestaurantSearchService;
import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
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

@RestController
@RequestMapping("api/v1/pickeats")
@RequiredArgsConstructor
public class PickeatController implements PickeatApiSpec {

    private final PickeatService pickeatService;
    private final RestaurantService restaurantService;
    private final RestaurantSearchService restaurantSearchService;

    @Override
    @PostMapping
    public ResponseEntity<PickeatResponse> createPickeat(@Valid @RequestBody PickeatRequest request) {
        List<RestaurantRequest> restaurantRequests = restaurantSearchService.search(request.x(), request.y(),
                request.radius());
        PickeatResponse response = pickeatService.createPickeat(request);
        restaurantService.create(restaurantRequests, response.id());
        String location = "/api/v1/pickeats/" + response.code();

        return ResponseEntity.created(URI.create(location))
                .body(response);
    }

    @Override
    @GetMapping("/{pickeatCode}/participants/state")
    public ResponseEntity<ParticipantStateResponse> getParticipantStateSummary(
            @PathVariable("pickeatCode") String pickeatCode) {
        ParticipantStateResponse response = pickeatService.getParticipantStateSummary(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @PatchMapping("/{pickeatCode}/deactivate")
    public ResponseEntity<Void> deactivatePickeat(@PathVariable("pickeatCode") String pickeatCode) {
        pickeatService.deactivatePickeat(pickeatCode);
        return ResponseEntity.ok().build();
    }

    @Override
    @GetMapping("/{pickeatCode}")
    public ResponseEntity<PickeatResponse> getPickeat(@PathVariable("pickeatCode") String pickeatCode) {
        PickeatResponse response = pickeatService.getPickeat(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @GetMapping("/{pickeatCode}/result")
    public ResponseEntity<List<RestaurantResponse>> getPickeatResult(@PathVariable("pickeatCode") String pickeatCode) {
        List<RestaurantResponse> response = pickeatService.getPickeatResult(pickeatCode);
        return ResponseEntity.ok().body(response);
    }

    @Override
    @GetMapping("/{pickeatCode}/restaurants")
    public ResponseEntity<List<RestaurantResponse>> getPickeatRestaurants(
            @PathVariable("pickeatCode") String pickeatCode,
            @RequestParam(required = false) Boolean isExcluded) {
        List<RestaurantResponse> response = pickeatService.getPickeatRestaurants(pickeatCode, isExcluded);
        return ResponseEntity.ok().body(response);
    }
}
