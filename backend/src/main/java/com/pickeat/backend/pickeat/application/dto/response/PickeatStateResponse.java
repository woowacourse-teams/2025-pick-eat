package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.pickeat.domain.Pickeat;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "픽잇 응답")
public record PickeatStateResponse(
        @Schema(description = "픽잇 활성화 상태", example = "true")
        boolean isActive
) {

    public static PickeatStateResponse from(Pickeat pickeat) {
        return new PickeatStateResponse(pickeat.getIsActive());
    }
}
