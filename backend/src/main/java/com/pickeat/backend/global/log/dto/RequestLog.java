package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import org.springframework.web.util.ContentCachingRequestWrapper;

public record RequestLog(
        LogType logType,
        String method,
        String body
) {
    public static RequestLog of(ContentCachingRequestWrapper request) {

        return new RequestLog(
                LogType.REQUEST,
                request.getMethod(),
                new String(request.getContentAsByteArray(), StandardCharsets.UTF_8)
        );
    }
}
