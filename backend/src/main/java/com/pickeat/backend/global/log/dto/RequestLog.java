package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
    private static final String NOW_TIME = LocalDateTime.now(ZoneId.of("Asia/Seoul"))
            .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

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
