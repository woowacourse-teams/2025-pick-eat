package com.pickeat.backend.global.log.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import org.slf4j.MDC;

public record ErrorLog(
        LogType logType,
        String timestamp,
        String requestId,
        int status,
        String message,
        String type,
        String customCode,
        String stackTrace
) {
    private static final String NOW_TIME = LocalDateTime.now(ZoneId.of("Asia/Seoul"))
            .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

    public static ErrorLog createServerErrorLog(
            int status,
            Throwable ex,
            String customCode
    ) {
        return new ErrorLog(
                LogType.SERVER_ERROR,
                NOW_TIME,
                MDC.get("request_id"),
                status,
                ex.getMessage(),
                ex.getClass().getName(),
                customCode,
                getStackTraceAsString(ex)
        );
    }

    public static ErrorLog createExternalErrorLog(
            int status,
            Throwable ex,
            String customCode
    ) {
        return new ErrorLog(
                LogType.EXTERNAL_ERROR,
                NOW_TIME,
                MDC.get("request_id"),
                status,
                ex.getMessage(),
                ex.getClass().getName(),
                customCode,
                getStackTraceAsString(ex)
        );
    }

    public static ErrorLog createClientErrorLog(
            int status,
            Throwable ex,
            String customCode
    ) {
        return new ErrorLog(
                LogType.CLIENT_ERROR,
                NOW_TIME,
                MDC.get("request_id"),
                status,
                ex.getMessage(),
                ex.getClass().getName(),
                customCode,
                "No Trace For Client Error"
        );
    }

    private static String getStackTraceAsString(Throwable ex) {
        StringBuilder sb = new StringBuilder();
        StackTraceElement[] stackTrace = ex.getStackTrace();
        int limit = Math.min(stackTrace.length, 5);
        for (int i = 0; i < limit; i++) {
            sb.append(stackTrace[i]).append("\n");
        }
        return sb.toString();
    }
}
