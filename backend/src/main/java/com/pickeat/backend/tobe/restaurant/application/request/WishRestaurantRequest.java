package com.pickeat.backend.tobe.restaurant.application.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record WishRestaurantRequest(
        @Schema(description = "방의 ID", example = "1")
        @NotNull(message = "방의 Id는 NULL일 수 없습니다.")
        Long roomId
) {

}
