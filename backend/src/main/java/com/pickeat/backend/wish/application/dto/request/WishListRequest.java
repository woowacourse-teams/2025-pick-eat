package com.pickeat.backend.wish.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "위시리스트 생성 요청")
public record WishListRequest(
        @Schema(description = "위시리스트 이름", example = "석촌호수 위시리스트")
        @NotBlank(message = "위시리스트 이름은 공백을 허용하지 않습니다.")
        String name
) {

}
