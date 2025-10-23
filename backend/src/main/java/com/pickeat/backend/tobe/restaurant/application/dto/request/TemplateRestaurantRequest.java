package com.pickeat.backend.tobe.restaurant.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "템플릿 기반 식당 생성 요청", name = "TemplateRestaurantRequestV2")
public record TemplateRestaurantRequest(
        @Schema(description = "템플릿 ID", example = "1")
        @NotNull(message = "템플릿 Id는 NULL일 수 없습니다.")
        Long templateId
) {

}
