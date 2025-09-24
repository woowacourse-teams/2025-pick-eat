package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(
        LogType logType,
        String body
) {
    public static ResponseLog of(ContentCachingResponseWrapper response) {
        String responseBody = "";
        try {
            responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            responseBody = "Error reading response body";
        }

        return new ResponseLog(
                LogType.RESPONSE,
                responseBody
        );
    }
}
