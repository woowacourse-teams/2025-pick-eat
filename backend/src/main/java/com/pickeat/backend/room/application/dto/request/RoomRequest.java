package com.pickeat.backend.room.application.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomRequest(@NotBlank(message = "방이름은 공백으로 입력할 수 없습니다.") String name,
                          @NotNull(message = "x 좌표는 NULL일 수 없습니다.") Double x,
                          @NotNull(message = "y 좌표는 NULL일 수 없습니다.") Double y,
                          @NotNull(message = "반경 범위는 NULL일 수 없습니다.") Integer radius) {

}
