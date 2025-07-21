package com.pickeat.backend.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ExternalApiException extends RuntimeException {
    private final String message;
    private final String platformName;
    private final HttpStatus httpStatus;

    public ExternalApiException(String message, String platformName, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.platformName = platformName;
        this.httpStatus = httpStatus;
    }
}
