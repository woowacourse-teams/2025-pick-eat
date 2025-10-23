package com.pickeat.backend.tobe.room.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "방 생성 요청", name = "RoomRequestV2")
public record RoomRequest(

        @NotBlank(message = "방 이름은 공백일 수 없습니다.")
        @Schema(description = "방 이름", example = "점심 같이 먹어요")
        String name
) {

}
