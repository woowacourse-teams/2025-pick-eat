package com.pickeat.backend.pickeat.application.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "픽잇 재참여 가능 여부 응답")
public record PickeatRejoinAvailableResponse(
        @Schema(description = "재참여 가능 여부", example = "true")
        boolean isAvailable) {

}