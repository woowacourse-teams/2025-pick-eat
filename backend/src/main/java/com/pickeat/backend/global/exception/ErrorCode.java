package com.pickeat.backend.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // Room 관련 에러
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "방을 찾을 수 없습니다."),
    ROOM_ALREADY_INACTIVE(HttpStatus.BAD_REQUEST, "이미 비활성화된 방입니다."),
    INVALID_ROOM_CODE(HttpStatus.BAD_REQUEST, "유효하지 않은 방 코드입니다."),

    // Participant 관련 에러
    PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "참가자를 찾을 수 없습니다."),
    PARTICIPANT_ALREADY_ELIMINATED(HttpStatus.BAD_REQUEST, "이미 소거된 참가자입니다."),

    // 도메인 검증 에러
    INVALID_RADIUS(HttpStatus.BAD_REQUEST, "반지름은 1 ~ 20000 사이 양수여야 합니다."),
    INVALID_LATITUDE(HttpStatus.BAD_REQUEST, "위도는 -90도에서 90도 사이여야 합니다."),
    INVALID_LONGITUDE(HttpStatus.BAD_REQUEST, "경도는 -180도에서 180도 사이여야 합니다."),

    // 시스템 에러
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류가 발생했습니다.");

    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

}
