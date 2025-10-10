package com.pickeat.backend.global.config.intercepter;

import com.pickeat.backend.global.annotation.DeprecatedApi;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class DeprecationInterceptor implements HandlerInterceptor {

    private final Map<Class<?>, Optional<DeprecatedApi>> classCache =
            new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request,
                             @Nullable HttpServletResponse response,
                             @Nullable Object handler) {
        if (!request.getRequestURI().startsWith("/api/v1/")) {
            return true;
        }

        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        Class<?> controllerClass = handlerMethod.getBeanType();
        Optional<DeprecatedApi> classDeprecated = classCache.computeIfAbsent(
                controllerClass,
                clazz -> Optional.ofNullable(
                        clazz.getAnnotation(DeprecatedApi.class)
                )
        );

        classDeprecated.ifPresent(deprecated ->
                addDeprecationHeaders(response, deprecated, request)
        );

        return true;
    }


    private void addDeprecationHeaders(HttpServletResponse response,
                                       DeprecatedApi deprecated,
                                       HttpServletRequest request) {
        response.setHeader("Deprecation", "true");

        if (!deprecated.sunset().isEmpty()) {
            response.setHeader("Sunset", deprecated.sunset());
        }

        String alternateUrl = deprecated.alternateUrl();
        if (alternateUrl.isEmpty()) {
            alternateUrl = request.getRequestURI().replace("/v1/", "/v2/");
        }
        response.setHeader("Link",
                String.format("<%s>; rel=\"alternate\"", alternateUrl));
    }
}
