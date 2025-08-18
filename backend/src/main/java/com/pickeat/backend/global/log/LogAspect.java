//TODO: 필터단에서 요청/응답 로깅을 처리하면서 해당 로깅 aop는 주석처리, 추후 특정 비즈니스 로직 로깅 등의 목적으로 재활용 예정 (2025-08-19, 화, 1:47)
//package com.pickeat.backend.global.log;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.util.Arrays;
//import java.util.stream.Collectors;
//import lombok.extern.slf4j.Slf4j;
//import org.aspectj.lang.ProceedingJoinPoint;
//import org.aspectj.lang.annotation.Around;
//import org.aspectj.lang.annotation.Aspect;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//
//@Aspect
//@Slf4j
//@Component
//public class LogAspect {
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Around("execution(* com.pickeat.backend..ui..*(..))")
//    public Object logApiCall(ProceedingJoinPoint joinPoint) throws Throwable {
//        long start = System.currentTimeMillis();
//
//        HttpServletRequest request = getCurrentRequest();
//        String method = request.getMethod();
//        String uri = request.getRequestURI();
//        String requestBody = extractArguments(joinPoint.getArgs());
//
//        try {
//            Object result = joinPoint.proceed();
//
//            long duration = System.currentTimeMillis() - start;
//            String responseBody = extractResponseBody(result);
//            Integer status = extractStatus(result);
//
//            log.info("API {} {} [{}ms]\nRequest: {}\nResponse: {}\nStatus: {}",
//                    method, uri, duration,
//                    requestBody,
//                    responseBody,
//                    status != null ? status : "UNKNOWN"
//            );
//
//            return result;
//
//        } catch (Throwable e) {
//            long duration = System.currentTimeMillis() - start;
//
//            log.info("API {} {} [{}ms]\nRequest: {}\nResult: Exception occurred: {}",
//                    method, uri, duration,
//                    requestBody,
//                    e.getClass().getSimpleName()
//            );
//
//            throw e;
//        }
//    }
//
//    private HttpServletRequest getCurrentRequest() {
//        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//        return attr != null ? attr.getRequest() : null;
//    }
//
//    private String extractArguments(Object[] args) {
//        try {
//            return Arrays.stream(args)
//                    .filter(arg -> !(arg instanceof HttpServletRequest) && !(arg instanceof HttpServletResponse))
//                    .map(arg -> {
//                        try {
//                            return objectMapper.writeValueAsString(arg);
//                        } catch (JsonProcessingException ex) {
//                            return arg.toString();
//                        }
//                    })
//                    .collect(Collectors.joining(", "));
//        } catch (Exception e) {
//            return "Unserializable arguments";
//        }
//    }
//
//    private String extractResponseBody(Object result) {
//        if (result instanceof ResponseEntity<?> responseEntity) {
//            Object body = responseEntity.getBody();
//            try {
//                return objectMapper.writeValueAsString(body);
//            } catch (JsonProcessingException e) {
//                return String.valueOf(body);
//            }
//        }
//
//        try {
//            return objectMapper.writeValueAsString(result);
//        } catch (JsonProcessingException e) {
//            return String.valueOf(result);
//        }
//    }
//
//    private Integer extractStatus(Object result) {
//        if (result instanceof ResponseEntity<?> responseEntity) {
//            return responseEntity.getStatusCode().value();
//        }
//        return null;
//    }
//}
