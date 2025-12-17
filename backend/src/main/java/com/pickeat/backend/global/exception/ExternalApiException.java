package com.pickeat.backend.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ExternalApiException extends RuntimeException {

    private final String message;
    private final String platformName;
    private final HttpStatus httpStatus;
    private final int statusCode;

    public ExternalApiException(String message, String platformName, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.platformName = platformName;
        this.httpStatus = httpStatus;
        this.statusCode = httpStatus.value();
    }

    public ExternalApiException(String message, String platformName, int statusCode) {
        super(message);
        this.message = message;
        this.platformName = platformName;
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.statusCode = statusCode;
    }
}
