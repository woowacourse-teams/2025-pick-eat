package com.pickeat.backend.room.application.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "참여자 상태 응답")
public record ParticipantStateResponse(
        @Schema(description = "전체 참여자 수", example = "5")
        int totalParticipants,

        @Schema(description = "소거한 참여자 수", example = "2")
        int eliminatedParticipants
) {

    public static ParticipantStateResponse of(int totalParticipants, int eliminatedParticipants) {
        return new ParticipantStateResponse(totalParticipants, eliminatedParticipants);
    }
}
