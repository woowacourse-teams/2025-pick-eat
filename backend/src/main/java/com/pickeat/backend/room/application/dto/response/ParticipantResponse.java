package com.pickeat.backend.room.application.dto.response;

import com.pickeat.backend.room.domain.Participant;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "참여자 응답")
public record ParticipantResponse(
        @Schema(description = "참여자 ID", example = "456")
        long id,

        @Schema(description = "참여자 닉네임", example = "몽이")
        String nickname,

        @Schema(description = "참여한 방의 코드 (UUID)", example = "abc123de-f456-789g-hijk-lmnopqrstuvw")
        String roomCode
) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                participant.getNickname(),
                participant.getRoom().getCode().toString()
        );
    }
}
