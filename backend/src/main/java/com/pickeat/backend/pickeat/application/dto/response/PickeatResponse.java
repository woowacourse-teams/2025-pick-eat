package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.pickeat.domain.Pickeat;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "픽잇 응답")
public record PickeatResponse(
        @Schema(description = "픽잇 ID", example = "123")
        long id,

        @Schema(description = "픽잇 코드 (UUID)", example = "abc123de-f456-789g-hijk-lmnopqrstuvw")
        String code,

        @Schema(description = "픽잇 이름", example = "점심 맛집 찾기")
        String name,

        @Schema(description = "참여자 수", example = "5")
        int participantCount,

        @Schema(description = "픽잇 활성화 상태", example = "true")
        boolean isActive
) {

    public static PickeatResponse from(Pickeat pickeat) {
        return new PickeatResponse(
                pickeat.getId(),
                pickeat.getCode().toString(),
                pickeat.getName(),
                pickeat.getParticipantCount(),
                pickeat.getIsActive()
        );
    }
}
