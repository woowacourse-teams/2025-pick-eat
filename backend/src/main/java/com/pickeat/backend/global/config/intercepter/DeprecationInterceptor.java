package com.pickeat.backend.global.config.intercepter;

import com.pickeat.backend.global.config.annotation.DeprecatedApi;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class DeprecationInterceptor implements HandlerInterceptor {

    private final Map<Class<?>, Optional<DeprecatedApi>> classCache = new ConcurrentHashMap<>();
    private final Map<Method, Optional<DeprecatedApi>> methodCache = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request,
                             @Nullable HttpServletResponse response,
                             @Nullable Object handler) {
        if (response == null || !request.getRequestURI().startsWith("/api/v1/")) {
            return true;
        }

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        // 메서드 레벨 어노테이션 우선 확인
        Method method = handlerMethod.getMethod();
        Optional<DeprecatedApi> methodDeprecated = methodCache.computeIfAbsent(
                method, m -> Optional.ofNullable(m.getAnnotation(DeprecatedApi.class)));

        if (methodDeprecated.isPresent()) {
            addDeprecationHeaders(response, methodDeprecated.get(), request);
            return true;
        }

        // 클래스 레벨 어노테이션 확인
        Class<?> controllerClass = handlerMethod.getBeanType();
        Optional<DeprecatedApi> classDeprecated = classCache.computeIfAbsent(
                controllerClass, clazz -> Optional.ofNullable(clazz.getAnnotation(DeprecatedApi.class)));

        classDeprecated.ifPresent(deprecated ->
                addDeprecationHeaders(response, deprecated, request)
        );

        return true;
    }

    private void addDeprecationHeaders(HttpServletResponse response,
                                       DeprecatedApi deprecated,
                                       HttpServletRequest request) {
        if (!deprecated.since().isEmpty()) {
            response.setHeader("Deprecation", deprecated.since());
        } else {
            response.setHeader("Deprecation", "true");
        }

        if (!deprecated.sunset().isEmpty()) {
            response.setHeader("Sunset", deprecated.sunset());
        }
        response.setHeader("Link", getAlternateUrl(deprecated, request));
    }

    private static String getAlternateUrl(DeprecatedApi deprecated, HttpServletRequest request) {
        String alternateUrl = deprecated.alternateUrl();
        if (alternateUrl.isEmpty()) {
            alternateUrl = request.getRequestURI().replace("/v1/", "/v2/");
        }
        return String.format("<%s>; rel=\"alternate\"", alternateUrl);
    }
}
