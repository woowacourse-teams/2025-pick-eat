package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(
        LogType logType,
        String uri,
        int status,
        String body
) implements Log {

    public static ResponseLog of(ContentCachingResponseWrapper response, String requestURI) {
        String responseBody;
        try {
            responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            responseBody = "Error reading response body";
        }
        return new ResponseLog(
                LogType.RESPONSE,
                requestURI,
                response.getStatus(),
                responseBody
        );
    }

    @Override
    public Map<String, Object> fields() {
        return Map.of(
                "logType", logType.name(),
                "uri", uri,
                "status", status,
                "body", body
        );
    }

    @Override
    public String summary() {
        return String.format("[%s] %s %d", logType.name(), uri, status);
    }
}
