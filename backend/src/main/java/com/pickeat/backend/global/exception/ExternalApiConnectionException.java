package com.pickeat.backend.global.exception;

import lombok.Getter;

@Getter
public class ExternalApiConnectionException extends RuntimeException {

    private final String message;
    private final String platformName;

    public ExternalApiConnectionException(String message, String platformName) {
        super(message);
        this.message = message;
        this.platformName = platformName;
    }
}
