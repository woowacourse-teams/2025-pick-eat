package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.pickeat.domain.Participant;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "참가자 응답")
public record ParticipantResponse(
        @Schema(description = "참가자 ID", example = "3")
        long id,

        @Schema(description = "참가자 닉네임", example = "김에드")
        String nickname,

        @Schema(description = "참가자 투표 완료 여부", example = "true")
        boolean isCompleted
) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                participant.getNickname(),
                participant.getIsCompleted()
        );
    }

    public static List<ParticipantResponse> from(List<Participant> participants) {
        return participants.stream().map(ParticipantResponse::from).toList();
    }
}
