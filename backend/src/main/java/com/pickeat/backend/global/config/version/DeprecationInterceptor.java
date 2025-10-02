package com.pickeat.backend.global.config.version;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.AllArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@AllArgsConstructor
public class DeprecationInterceptor implements HandlerInterceptor {

    private final ApiVersionManager apiVersionManager;
    private final Map<Class<?>, Boolean> classCache = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request,
                             @Nullable HttpServletResponse response,
                             @Nullable Object handler) {
        if (response == null || !(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }
        Class<?> controllerClass = handlerMethod.getBeanType();
        Boolean isDeprecated = classCache.computeIfAbsent(
                controllerClass, clazz -> clazz.isAnnotationPresent(Deprecated.class));

        if (isDeprecated) {
            String requestUri = request.getRequestURI();
            String currentVersion = extractVersion(requestUri);

            if (currentVersion != null && apiVersionManager.isDeprecated(currentVersion)) {
                addDeprecationHeaders(response, currentVersion, requestUri);
            }
        }

        return true;
    }

    private void addDeprecationHeaders(HttpServletResponse response, String currentVersion, String requestUri) {
        ApiVersionManager.VersionInfo versionInfo = apiVersionManager.getVersionInfo(currentVersion);
        String migrationTarget = versionInfo.migrateTo() != null
                ? versionInfo.migrateTo()
                : apiVersionManager.getLatestVersion();

        String alternateUrl = requestUri.replaceFirst("/" + currentVersion + "/", "/" + migrationTarget + "/");

        response.setHeader("Deprecation", "@" + versionInfo.deprecationDate());
        response.setHeader("Link", String.format("<%s>; rel=\"alternate\"", alternateUrl));
        response.setHeader("Sunset", versionInfo.deprecationDate());
    }

    private String extractVersion(String uri) {
        String[] parts = uri.split("/");
        for (String part : parts) {
            if (part.matches("v\\d+")) {
                return part;
            }
        }
        return null;
    }
}
