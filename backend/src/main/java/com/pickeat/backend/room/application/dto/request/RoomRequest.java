package com.pickeat.backend.room.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "방 생성 요청")
public record RoomRequest(
        @Schema(description = "방 이름", example = "점심 맛집 찾기")
        @NotBlank(message = "방이름은 공백으로 입력할 수 없습니다.")
        String name,

        @Schema(description = "중심 위치의 x 좌표 (경도)", example = "127.134233269327")
        @NotNull(message = "x 좌표는 NULL일 수 없습니다.")
        Double x,

        @Schema(description = "중심 위치의 y 좌표 (위도)", example = "37.4098787808312")
        @NotNull(message = "y 좌표는 NULL일 수 없습니다.")
        Double y,

        @Schema(description = "검색 반경 (미터 단위)", example = "500")
        @NotNull(message = "반경 범위는 NULL일 수 없습니다.")
        Integer radius
) {

}
