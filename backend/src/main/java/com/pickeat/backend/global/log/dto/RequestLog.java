package com.pickeat.backend.global.log.dto;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.util.ContentCachingRequestWrapper;

public record RequestLog(LogType logType,
                         String method,
                         String body) implements Log {
    public static RequestLog of(ContentCachingRequestWrapper request) {

        return new RequestLog(
                LogType.REQUEST,
                request.getMethod(),
                new String(request.getContentAsByteArray(), StandardCharsets.UTF_8)
        );
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("logType", logType.name());
        map.put("method", method);
        map.put("body", body);
        return map;
    }
}
