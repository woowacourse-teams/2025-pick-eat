package com.pickeat.backend.login.application.dto;

import jakarta.validation.constraints.NotBlank;

public record KakaoAuthCodeRequest(@NotBlank(message = "코드는 공백일 수 없습니다.") String code) {

}
