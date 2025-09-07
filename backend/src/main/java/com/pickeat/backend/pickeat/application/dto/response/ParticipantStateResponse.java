package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.pickeat.domain.Participant;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "참여자 상태 응답")
public record ParticipantStateResponse(
        @Schema(description = "전체 참여자 수", example = "5")
        int totalParticipants,

        @Schema(description = "각 참가자 정보")
        List<ParticipantResponse> participants
) {

    public static ParticipantStateResponse from(List<Participant> participants) {
        return new ParticipantStateResponse(participants.size(), ParticipantResponse.from(participants));
    }
}
