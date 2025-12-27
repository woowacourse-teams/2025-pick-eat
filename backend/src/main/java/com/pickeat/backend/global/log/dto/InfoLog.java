package com.pickeat.backend.global.log.dto;

import java.util.HashMap;
import java.util.Map;

public record InfoLog(
        LogType logType,
        String event,
        String message,
        Map<String, Object> attributes
) implements Log {

    @Override
    public Map<String, Object> fields() {
        Map<String, Object> map = new HashMap<>();
        map.put("logType", logType.name());
        map.put("event", event);
        map.put("message", message);
        map.putAll(attributes);
        return map;
    }

    @Override
    public String summary() {
        return String.format("[%s:%s] %s", logType.name(), event, message);
    }

    public static InfoLog of(LogType logType, String event, String message) {
        return new InfoLog(logType, event, message, Map.of());
    }

    public static InfoLog of(LogType logType, String event, String message, Map<String, Object> attrs) {
        return new InfoLog(logType, event, message, attrs);
    }
}
