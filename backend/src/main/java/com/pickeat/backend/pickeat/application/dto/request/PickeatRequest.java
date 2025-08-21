package com.pickeat.backend.pickeat.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "픽잇 생성 요청")
public record PickeatRequest(
        @Schema(description = "픽잇 이름", example = "점심 맛집 찾기")
        @NotBlank(message = "픽잇이름은 공백으로 입력할 수 없습니다.")
        String name
) {

}
