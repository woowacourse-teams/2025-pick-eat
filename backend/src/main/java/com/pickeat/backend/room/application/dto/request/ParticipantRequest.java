package com.pickeat.backend.room.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "참여자 생성 요청")
public record ParticipantRequest(
        @Schema(description = "참여자 닉네임", example = "몽이")
        @NotBlank(message = "닉네임은 공백으로 입력할 수 없습니다.")
        String nickname,

        @Schema(description = "참여할 방의 ID", example = "123")
        @NotNull(message = "방 ID는 NULL일 수 없습니다.")
        Long roomId
) {

}
