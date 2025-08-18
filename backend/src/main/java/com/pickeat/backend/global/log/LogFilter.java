package com.pickeat.backend.global.log;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.log.dto.RequestLog;
import com.pickeat.backend.global.log.dto.ResponseLog;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogFilter extends OncePerRequestFilter {

    private static final List<String> EXCLUDE_URI = List.of(
            "/actuator/**",
            "/swagger-ui/**",
            "/v3/api-docs/**"
    );
    private final ObjectMapper objectMapper;
    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String requestURI = request.getRequestURI();
        if (isExcluded(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        ContentCachingRequestWrapper cacheRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper cacheResponse = new ContentCachingResponseWrapper(response);

        createTraceIds();
        MDC.put("request_uri", requestURI);
        MDC.put("client_ip", cacheRequest.getRemoteAddr());

        try {
            filterChain.doFilter(cacheRequest, cacheResponse);

            //TODO: ContentCachingRequestWrapper는 요청 바디가 실제로 읽힌 후에만 캐시에 저장됨.
            // 따라서 현재 요청 로그를 doFilter 이후에 찍게되면서 로그 순서상 리졸버 단의 예외 로그가 먼저 발생(2025-08-19, 화, 1:45):
            log.info(objectMapper.writeValueAsString(RequestLog.of(cacheRequest)));

        } finally {
            log.info(objectMapper.writeValueAsString(ResponseLog.of(cacheResponse)));

            cacheResponse.copyBodyToResponse();
            MDC.clear();
        }
    }

    private void createTraceIds() {
        String requestId = UUID.randomUUID().toString().substring(0, 8);
        MDC.put("request_id", requestId);
    }

    private boolean isExcluded(String requestURI) {
        return EXCLUDE_URI.stream().anyMatch(pattern -> antPathMatcher.match(pattern, requestURI));
    }
}
