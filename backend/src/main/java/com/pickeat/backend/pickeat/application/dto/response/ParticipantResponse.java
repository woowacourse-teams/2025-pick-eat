package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.pickeat.domain.Participant;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "참여자 응답")
public record ParticipantResponse(
        @Schema(description = "참여자 ID", example = "456")
        long id,

        @Schema(description = "참여자 닉네임", example = "몽이")
        String nickname,

        @Schema(description = "참여한 픽잇의 코드 (UUID)", example = "abc123de-f456-789g-hijk-lmnopqrstuvw")
        String pickeatCode
) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                participant.getNickname(),
                participant.getPickeat().getCode().toString()
        );
    }
}
