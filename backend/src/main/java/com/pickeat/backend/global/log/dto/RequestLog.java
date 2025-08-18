package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.MDC;
import org.springframework.web.util.ContentCachingRequestWrapper;

public record RequestLog(
        LogType logType,
        String timestamp,
        String requestId,
        String requestUri,
        String clientIp,
        String method,
        String body
) {

    public static RequestLog of(ContentCachingRequestWrapper request) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        return new RequestLog(
                LogType.REQUEST,
                timestamp,
                MDC.get("request_id"),
                request.getRequestURI(),
                request.getRemoteAddr(),
                request.getMethod(),
                new String(request.getContentAsByteArray(), StandardCharsets.UTF_8)
        );
    }

}
