package com.pickeat.backend.room.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "방 초대 요청")
public record RoomInvitationRequest(

        @NotEmpty(message = "초대할 사용자 ID 목록은 비어 있을 수 없습니다.")
        @Schema(description = "초대할 사용자 ID 목록", example = "[1, 2, 3]")
        List<Long> userIds
) {

}
