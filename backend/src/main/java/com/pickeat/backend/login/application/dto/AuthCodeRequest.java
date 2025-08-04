package com.pickeat.backend.login.application.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthCodeRequest(
        @NotBlank(message = "코드는 공백일 수 없습니다.") String code,
        @NotBlank(message = "로그인 방식은 공백일 수 없습니다.") String provider) {

}
