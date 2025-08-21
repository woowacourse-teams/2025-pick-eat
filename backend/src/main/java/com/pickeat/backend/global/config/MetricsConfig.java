package com.pickeat.backend.global.config;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.config.MeterFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Slf4j
@Profile("!test")
public class MetricsConfig {

    @Bean
    MeterRegistryCustomizer<MeterRegistry> goldenSignalsCustomizer() {
        return registry -> {
            registry.config()
                    // 1. 인프라 경로만 선별적으로 필터링 (비즈니스 API는 모두 유지)
                    .meterFilter(MeterFilter.deny(id -> {
                        if (!"http.server.requests".equals(id.getName())) {
                            return false; // HTTP 요청이 아니면 통과
                        }

                        String uri = id.getTag("uri");
                        if (uri == null) {
                            return true; // null만 거부
                        }

                        // UNKNOWN 요청도 유지 (대시보드 모니터링을 위해)
                        if ("UNKNOWN".equals(uri)) {
                            log.debug("Keeping UNKNOWN URI for monitoring");
                            return false; // 유지
                        }

                        // 인프라 경로만 거부
                        boolean isInfrastructure =
                                uri.startsWith("/actuator") ||
                                        uri.startsWith("/swagger") ||
                                        uri.startsWith("/v3/api-docs") ||
                                        uri.startsWith("/static") ||
                                        uri.startsWith("/webjars") ||
                                        uri.startsWith("/favicon") ||
                                        uri.equals("/") ||
                                        uri.equals("/error");

                        if (isInfrastructure) {
                            log.debug("Filtering infrastructure request: {}", uri);
                        }

                        return isInfrastructure; // 인프라 경로만 거부
                    }))

                    // 2. URI 정규화 (카디널리티 제어)
                    .meterFilter(MeterFilter.replaceTagValues("uri", uri -> {
                        if (uri == null || "UNKNOWN".equals(uri)) {
                            return uri; // null이나 UNKNOWN은 그대로 유지
                        }

                        try {
                            // 쿼리 파라미터 제거
                            int queryIndex = uri.indexOf('?');
                            if (queryIndex != -1) {
                                uri = uri.substring(0, queryIndex);
                            }

                            // ID 정규화: /123/ -> /{id}/
                            uri = uri.replaceAll("/\\d+(/|$)", "/{id}$1");

                            // UUID 정규화: /uuid/ -> /{uuid}/
                            uri = uri.replaceAll("/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(/|$)",
                                    "/{uuid}$1");

                            return uri;
                        } catch (Exception e) {
                            log.warn("Failed to normalize URI: {}, error: {}", uri, e.getMessage());
                            return uri;
                        }
                    }))

                    .commonTags(
                            "application", "pickeats-api"
                    );
        };
    }
}
