package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.util.ContentCachingResponseWrapper;

public record ResponseLog(LogType logType,
                          String body) implements Log {
    public static ResponseLog of(ContentCachingResponseWrapper response) {
        String responseBody = "";
        try {
            responseBody = new String(response.getContentAsByteArray(), StandardCharsets.UTF_8);
        } catch (Exception e) {
            responseBody = "Error reading response body";
        }

        return new ResponseLog(
                LogType.RESPONSE,
                responseBody
        );
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("logType", logType.name());
        map.put("body", body);
        return map;
    }
}
