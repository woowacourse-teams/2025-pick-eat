package com.pickeat.backend.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    // Pickeat 관련 에러
    PICKEAT_NOT_FOUND(HttpStatus.NOT_FOUND, "픽잇을 찾을 수 없습니다."),
    PICKEAT_ALREADY_INACTIVE(HttpStatus.BAD_REQUEST, "이미 비활성화된 픽잇입니다."),
    INVALID_PICKEAT_CODE(HttpStatus.BAD_REQUEST, "유효하지 않은 픽잇 코드입니다."),
    PICKEAT_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 픽잇에 접근 권한이 없습니다."),

    // Participant 관련 에러
    PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "참가자를 찾을 수 없습니다."),
    PARTICIPANT_ALREADY_ELIMINATED(HttpStatus.BAD_REQUEST, "이미 소거된 참가자입니다."),

    // WishList 관련 에러
    WISHLIST_NOT_FOUND(HttpStatus.NOT_FOUND, "위시리스트를 찾을 수 없습니다."),
    WISH_LIST_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 위시리스트에 접근할 권한이 없습니다."),

    // Wish 관련 에러
    WISH_NOT_FOUND(HttpStatus.NOT_FOUND, "위시를 찾을 수 없습니다."),
    WISH_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 위시에 접근할 권한이 없습니다."),

    // WishPicture 관련 에러
    NOT_ALLOWED_CONTENT_TYPE(HttpStatus.BAD_REQUEST, "허용하지 않은 위시 사진 타입입니다"),
    WISH_PICTURE_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 위시 이미지에 접근할 권한이 없습니다."),

    // 도메인 검증 에러
    INVALID_RADIUS(HttpStatus.BAD_REQUEST, "반지름은 1 ~ 20000 사이 양수여야 합니다."),
    INVALID_LATITUDE(HttpStatus.BAD_REQUEST, "위도는 -90도에서 90도 사이여야 합니다."),
    INVALID_LONGITUDE(HttpStatus.BAD_REQUEST, "경도는 -180도에서 180도 사이여야 합니다."),

    // Restaurant 관련 에러
    RESTAURANT_ELIMINATION_FORBIDDEN(HttpStatus.FORBIDDEN, "식당 소거 권한이 없습니다."),
    RESTAURANT_NOT_FOUND(HttpStatus.NOT_FOUND, "식당을 찾을 수 없습니다."),
    PARTICIPANT_RESTAURANT_ALREADY_LIKED(HttpStatus.BAD_REQUEST, "이미 좋아요를 누른 식당입니다."),
    PARTICIPANT_RESTAURANT_NOT_LIKED(HttpStatus.BAD_REQUEST, "좋아요 기록이 없습니다."),

    // User 관련 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),
    ALREADY_NICKNAME_EXISTS(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임 입니다."),
    SIGN_UP_REQUIRED(HttpStatus.UNAUTHORIZED, "회원가입이 필요한 계정입니다."),

    // Room 관련 에러
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "방을 찾을 없습니다."),
    ROOM_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 방에 접근할 권한이 없습니다."),

    //입력 검증 에러
    VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "입력 데이터 검증에 실패했습니다."),

    // 헤더 관련 에러
    HEADER_IS_EMPTY(HttpStatus.UNAUTHORIZED, "인증 헤더가 존재하지 않습니다."),

    // Jwt 관련 에러
    TOKEN_IS_EMPTY(HttpStatus.UNAUTHORIZED, "인증되지 않은 사용자입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 인증 정보입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),

    // 시스템 에러
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류가 발생했습니다."),
    
    INVALID_REDIRECT_TYPE(HttpStatus.INTERNAL_SERVER_ERROR, "잘못된 리다이렉트 주소입니다."),
    ;
  
    private final HttpStatus status;
    private final String message;

    ErrorCode(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
