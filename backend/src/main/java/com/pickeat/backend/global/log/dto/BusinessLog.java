package com.pickeat.backend.global.log.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private static final String NOW_TIME = LocalDateTime.now(ZoneId.of("Asia/Seoul"))
            .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

    public static BusinessLog of(Long userId, String action, String message) {
        return new BusinessLog(
                LogType.BUSINESS,
                NOW_TIME,
                MDC.get("request_id"),
                userId,
                action,
                message
        );
    }
}
