package com.pickeat.backend.global.log.dto;

import java.util.Map;

public interface Log {
    Map<String, Object> fields();

    String summary();
}
