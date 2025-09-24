package com.pickeat.backend.global.log.dto;

public record BusinessLog(
        LogType logType,
        Long userId,
        String action,
        String message
) {
    public static BusinessLog of(Long userId, String action, String message) {
        return new BusinessLog(
                LogType.BUSINESS,
                userId,
                action,
                message
        );
    }
}
