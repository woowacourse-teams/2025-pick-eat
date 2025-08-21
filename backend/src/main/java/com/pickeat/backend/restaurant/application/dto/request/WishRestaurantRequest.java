package com.pickeat.backend.restaurant.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public record WishRestaurantRequest(
        @Schema(description = "위시리스트의 ID", example = "1")
        @NotNull(message = "위시리스트의 Id는 NULL일 수 없습니다.")
        Long wishListId
) {

}
