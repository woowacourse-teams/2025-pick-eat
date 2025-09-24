package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import org.slf4j.MDC;
import org.springframework.web.util.ContentCachingRequestWrapper;

public record RequestLog(
        LogType logType,
        String requestId,
        String requestUri,
        String clientIp,
        String method,
        String body
) {
    public static RequestLog of(ContentCachingRequestWrapper request) {

        return new RequestLog(
                LogType.REQUEST,
                MDC.get("request_id"),
                request.getRequestURI(),
                request.getRemoteAddr(),
                request.getMethod(),
                new String(request.getContentAsByteArray(), StandardCharsets.UTF_8)
        );
    }
}
