package com.pickeat.backend.pickeat.application.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "픽잇 비활성화 변경 여부")
public record PickeatStateUpdateResponse(
        @Schema(description = "픽잇 비활성 상태 변경 여부", example = "true")
        boolean isUpdated
) {

}
