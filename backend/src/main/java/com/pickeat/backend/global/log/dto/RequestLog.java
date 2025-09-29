package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.springframework.web.util.ContentCachingRequestWrapper;

public record RequestLog(
        LogType logType,
        String method,
        String uri,
        String body
) implements Log {

    public static RequestLog of(ContentCachingRequestWrapper request, String requestURI) {
        String body = new String(request.getContentAsByteArray(), StandardCharsets.UTF_8);
        return new RequestLog(
                LogType.REQUEST,
                request.getMethod(),
                requestURI,
                body
        );
    }

    @Override
    public Map<String, Object> fields() {
        return Map.of(
                "logType", logType.name(),
                "method", method,
                "uri", uri,
                "body", body
        );
    }

    @Override
    public String summary() {
        return String.format("[%s] %s %s", logType.name(), method, uri);
    }
}
