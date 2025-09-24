package com.pickeat.backend.global.log.dto;

import org.slf4j.MDC;

public record BusinessLog(
        LogType logType,
        String requestId,
        Long userId,
        String action,
        String message
) {
    public static BusinessLog of(Long userId, String action, String message) {
        return new BusinessLog(
                LogType.BUSINESS,
                MDC.get("request_id"),
                userId,
                action,
                message
        );
    }
}
