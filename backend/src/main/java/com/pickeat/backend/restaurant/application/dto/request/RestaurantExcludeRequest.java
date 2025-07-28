package com.pickeat.backend.restaurant.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "식당 소거 요청")
public record RestaurantExcludeRequest(
        @Schema(description = "소거할 식당 ID 목록", example = "[1, 2, 3, 5, 8]")
        List<Long> restaurantIds
) {

}
