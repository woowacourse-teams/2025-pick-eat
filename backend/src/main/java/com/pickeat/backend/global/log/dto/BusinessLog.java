package com.pickeat.backend.global.log.dto;

import java.util.Map;

public record BusinessLog(
        LogType logType,
        Long userId,
        String action
) implements Log {

    public static BusinessLog of(Long userId, String action) {
        return new BusinessLog(
                LogType.BUSINESS,
                userId,
                action
        );
    }

    @Override
    public Map<String, Object> fields() {
        return Map.of(
                "logType", logType.name(),
                "userId", userId,
                "action", action
        );
    }

    @Override
    public String summary() {
        return String.format("[%s] User %d executed %s", LogType.BUSINESS.name(), userId, action);
    }
}
