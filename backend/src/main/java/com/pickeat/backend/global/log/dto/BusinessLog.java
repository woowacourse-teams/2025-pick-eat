package com.pickeat.backend.global.log.dto;

import java.util.Map;

public record BusinessLog(LogType logType,
                          Long userId,
                          String action,
                          String message) implements Log {

    public static BusinessLog of(Long userId, String action, String message) {
        return new BusinessLog(
                LogType.BUSINESS,
                userId,
                action,
                message
        );
    }

    public Map<String, Object> toMap() {
        return Map.of(
                "logType", logType.name(),
                "userId", userId,
                "action", action,
                "message", message
        );
    }
}
