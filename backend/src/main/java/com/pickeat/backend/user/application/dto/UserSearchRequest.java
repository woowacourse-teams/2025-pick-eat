package com.pickeat.backend.user.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;

public record UserSearchRequest(
        @NotEmpty(message = "닉네임은 빈 값일 수 없습니다.")
        @Schema(description = "검색할 사용자의 닉네임", example = "머핀")
        String nickname
) {

}
