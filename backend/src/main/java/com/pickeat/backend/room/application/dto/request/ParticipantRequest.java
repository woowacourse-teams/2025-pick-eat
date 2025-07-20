package com.pickeat.backend.room.application.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ParticipantRequest(@NotBlank(message = "닉네임은 공백으로 입력할 수 없습니다.") String nickname,
                                 @NotNull(message = "방 ID는 NULL일 수 없습니다.") Long roomId) {

}
