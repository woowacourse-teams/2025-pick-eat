package com.pickeat.backend.global.log;

import com.pickeat.backend.global.log.dto.BusinessLog;
import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.marker.Markers;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
public class BusinessLogAspect {

    @Around("@annotation(businessLogging)")
    public Object logBusinessAction(ProceedingJoinPoint joinPoint, BusinessLogging businessLogging) throws Throwable {

        String action = businessLogging.value();
        Long userId = extractUserId(joinPoint.getArgs());

        Object result = joinPoint.proceed();
        BusinessLog businessLog = BusinessLog.of(userId, action);
        log.info(Markers.appendEntries(businessLog.fields()), businessLog.summary());
        return result;
    }

    private Long extractUserId(Object[] args) {
        for (Object arg : args) {
            if (arg instanceof Long userId) {
                return userId;
            }
        }
        return null;
    }
}
