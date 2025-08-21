package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import org.slf4j.MDC;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(
        LogType logType,
        String timestamp,
        String requestId,
        String body
) {
    private static final String NOW_TIME = LocalDateTime.now(ZoneId.of("Asia/Seoul"))
            .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

    public static ResponseLog of(ContentCachingResponseWrapper response) {
        String responseBody = "";
        try {
            responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            responseBody = "Error reading response body";
        }

        return new ResponseLog(
                LogType.RESPONSE,
                NOW_TIME,
                MDC.get("request_id"),
                responseBody
        );
    }
}
