package com.pickeat.backend.global.log.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.slf4j.MDC;

public record BusinessLog(
        LogType logType,
        String timestamp,
        String requestId,
        Long userId,
        String action,
        String message
) {

    public static BusinessLog of(Long userId, String action, String message) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        return new BusinessLog(
                LogType.BUSINESS,
                timestamp,
                MDC.get("request_id"),
                userId,
                action,
                message
        );
    }
}
