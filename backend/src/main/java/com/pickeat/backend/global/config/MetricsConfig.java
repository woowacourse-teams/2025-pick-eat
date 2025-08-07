package com.pickeat.backend.global.config;

import io.micrometer.core.instrument.Meter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.config.MeterFilter;
import java.util.Arrays;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Micrometer 메트릭 설정을 위한 구성 클래스입니다. 운영 환경에서 Golden Signals (SLI, SLO)에 필요한 메트릭만 수집하고, 불필요한 메트릭은 제외합니다. 테스트 환경에서는 이 설정을
 * 적용하지 않습니다.
 */
@Configuration
@Slf4j
@Profile("!test")
public class MetricsConfig {

    // HTTP 요청 메트릭의 이름과 URI 태그 키를 상수로 정의
    private static final String HTTP_REQUESTS_METER_NAME = "http.server.requests";
    private static final String URI_TAG_KEY = "uri";

    // 불필요한 인프라 관련 경로 목록
    private static final List<String> INFRASTRUCTURE_PATHS = Arrays.asList(
            "/actuator", "/swagger", "/v3/api-docs", "/static", "/webjars", "/favicon", "/", "/error"
    );

    // 수집을 거부할 불필요한 메트릭 이름 접두사 목록
    private static final List<String> DENY_PREFIXES = Arrays.asList(
            "jvm.gc", "jvm.buffer", "jvm.classes", "jvm.threads", "jvm.compilation",
            "disk", "logback", "tomcat.sessions", "cache", "spring.integration",
            "rabbitmq", "redis"
    );

    /**
     * Micrometer MeterRegistry를 커스터마이징하는 Bean을 생성합니다. 이 커스터마이저는 메트릭 필터링, URI 정규화, 공통 태그 추가 등의 역할을 수행합니다.
     */
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> goldenSignalsCustomizer() {
        return registry -> registry.config()
                // 1. 비즈니스 API가 아닌 요청 및 인프라 관련 요청을 필터링합니다.
                .meterFilter(MeterFilter.deny(this::isNotBusinessApi))
                // 2. URI 태그의 고유성(카디널리티)을 낮추기 위해 정규화합니다.
                .meterFilter(MeterFilter.replaceTagValues(URI_TAG_KEY, this::normalizeUriTag))
                // 3. Golden Signals에 불필요한 메트릭들을 필터링합니다.
                .meterFilter(MeterFilter.deny(this::isUnnecessaryMetric))
                // 4. 모든 메트릭에 서비스와 애플리케이션 정보를 공통 태그로 추가합니다.
                .commonTags("service", "pickeats", "application", "pickeats-api");
    }

    /**
     * HTTP 요청이 비즈니스 API 요청인지, 인프라 관련 요청인지 판단하여 필터링합니다.
     *
     * @param id 메트릭 ID
     * @return 필터링(거부) 여부
     */
    private boolean isNotBusinessApi(Meter.Id id) {
        if (!HTTP_REQUESTS_METER_NAME.equals(id.getName())) {
            // HTTP 요청 메트릭이 아니면 통과
            return false;
        }

        String uri = id.getTag(URI_TAG_KEY);
        if (uri == null || "UNKNOWN".equals(uri)) {
            // URI가 없거나 UNKNOWN이면 거부
            return true;
        }

        // 비즈니스 API 경로(ex: /api/v1/)가 아니거나 인프라 관련 경로이면 거부
        boolean isBusinessApi = uri.startsWith("/api/v1/");
        boolean isInfrastructure = INFRASTRUCTURE_PATHS.stream().anyMatch(uri::startsWith);

        return !isBusinessApi || isInfrastructure;
    }

    /**
     * URI 태그를 정규화하여 동적인 값을 일반적인 패턴으로 바꿉니다. ex: /api/v1/users/123 -> /api/v1/users/{id}
     *
     * @param uri 정규화할 URI 문자열
     * @return 정규화된 URI 문자열
     */
    private String normalizeUriTag(String uri) {
        if (uri == null) {
            return null;
        }

        // 쿼리 파라미터 제거
        uri = removeQueryParameters(uri);
        // 숫자 ID를 {id}로 대체
        uri = replaceIds(uri);
        // UUID를 {uuid}로 대체
        uri = replaceUuids(uri);

        return uri;
    }

    private String removeQueryParameters(String uri) {
        int queryIndex = uri.indexOf('?');
        return (queryIndex != -1) ? uri.substring(0, queryIndex) : uri;
    }

    private String replaceIds(String uri) {
        return uri.replaceAll("/\\d+(/|$)", "/{id}$1");
    }

    private String replaceUuids(String uri) {
        return uri.replaceAll("/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(/|$)", "/{uuid}$1");
    }

    /**
     * 메트릭 이름이 불필요한 접두사로 시작하는지 확인합니다.
     *
     * @param id 메트릭 ID
     * @return 필터링(거부) 여부
     */
    private boolean isUnnecessaryMetric(Meter.Id id) {
        String name = id.getName();
        return DENY_PREFIXES.stream().anyMatch(name::startsWith);
    }
}
