package com.pickeat.backend.global.log.dto;

import java.util.Map;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(
        LogType logType,
        String uri,
        int status
) implements Log {

    public static ResponseLog of(ContentCachingResponseWrapper response, String requestURI) {
        return new ResponseLog(
                LogType.RESPONSE,
                requestURI,
                response.getStatus()
        );
    }

    @Override
    public Map<String, Object> fields() {
        return Map.of(
                "logType", logType.name(),
                "uri", uri,
                "status", status
        );
    }

    @Override
    public String summary() {
        return String.format("[%s] %s %d", logType.name(), uri, status);
    }
}
