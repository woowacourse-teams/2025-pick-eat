package com.pickeat.backend.login.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record SignupRequest(@NotBlank(message = "닉네임은 공백으로 입력할 수 없습니다.") String nickname) {

}
