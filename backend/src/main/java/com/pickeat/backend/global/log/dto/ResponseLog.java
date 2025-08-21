package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.MDC;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(
        LogType logType,
        String timestamp,
        String requestId,
        String body
) {

    public static ResponseLog of(ContentCachingResponseWrapper response) {
        String responseBody = "";
        try {
            responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            responseBody = "Error reading response body";
        }

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        return new ResponseLog(
                LogType.RESPONSE,
                timestamp,
                MDC.get("request_id"),
                responseBody
        );
    }
}
