package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.global.exception.ExternalApiConnectionException;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.global.log.dto.ErrorLog;
import com.pickeat.backend.global.log.dto.InfoLog;
import com.pickeat.backend.global.log.dto.LogType;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import io.github.resilience4j.circuitbreaker.CallNotPermittedException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.marker.Markers;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Profile({"local", "prod", "dev"})
@Primary
@Slf4j
@Component
public class FailoverRestaurantSearchClientGateway implements RestaurantSearchClient {

    private final RestaurantSearchClient primaryClient;
    private final RestaurantSearchClient secondaryClient;
    private final Counter fallbackCounter;

    public FailoverRestaurantSearchClientGateway(
            @Qualifier("kakaoRestaurantSearchClient") RestaurantSearchClient primaryClient,
            @Qualifier("googleRestaurantSearchClient") RestaurantSearchClient secondaryClient,
            MeterRegistry meterRegistry) {
        this.primaryClient = primaryClient;
        this.secondaryClient = secondaryClient;
        this.fallbackCounter = Counter.builder("restaurant_search_fallback_total")
                .description("fallback to secondary total")
                .tag("from", "kakao")
                .tag("to", "google")
                .register(meterRegistry);
    }

    @Override
    @Retry(name = "kakaoSearch")
    @CircuitBreaker(name = "kakaoSearch", fallbackMethod = "fallback")
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        return primaryClient.getRestaurants(request);
    }

    private List<RestaurantRequest> fallback(RestaurantSearchRequest request, CallNotPermittedException e) {
        InfoLog infoLog = InfoLog.of(
                LogType.INFO,
                "RESTAURANT_SEARCH_FAILOVER_CB_OPEN",
                "Primary circuit breaker is OPEN. Fallback to secondary.",
                Map.of(
                        "from", "kakao",
                        "to", "google",
                        "exception", e.getClass().getSimpleName()
                )
        );
        logFailoverInfo(infoLog);

        fallbackCounter.increment();

        return secondaryClient.getRestaurants(request);
    }

    private List<RestaurantRequest> fallback(RestaurantSearchRequest request, ExternalApiException e) {
        int statusCode = e.getStatusCode();

        if (statusCode == 429) {
            InfoLog infoLog = InfoLog.of(
                    LogType.INFO,
                    "RESTAURANT_SEARCH_FAILOVER_RATE_LIMIT",
                    "Primary failed with rate limit(429). Fallback to secondary.",
                    Map.of(
                            "from", "kakao",
                            "to", "google",
                            "statusCode", statusCode,
                            "platform", e.getPlatformName()
                    )
            );
            logFailoverInfo(infoLog);

            fallbackCounter.increment();

            return secondaryClient.getRestaurants(request);
        }

        if (statusCode >= 500 && statusCode < 600) {
            ErrorLog errorLog = ErrorLog.createExternalErrorLog(
                    statusCode,
                    e,
                    "RESTAURANT_SEARCH_FAILOVER_5XX"
            );
            logFailoverError(errorLog);

            fallbackCounter.increment();

            return secondaryClient.getRestaurants(request);
        }

        throw e;
    }

    private List<RestaurantRequest> fallback(RestaurantSearchRequest request, ExternalApiConnectionException e) {
        ErrorLog errorLog = ErrorLog.createExternalErrorLog(
                HttpStatus.SERVICE_UNAVAILABLE.value(),
                e,
                "EXTERNAL_CONNECTION_TIMEOUT"
        );
        logFailoverError(errorLog);

        fallbackCounter.increment();

        return secondaryClient.getRestaurants(request);
    }

    private void logFailoverInfo(InfoLog infoLog) {
        log.info(
                Markers.appendEntries(infoLog.fields()),
                infoLog.summary()
        );
    }

    private void logFailoverError(ErrorLog errorLog) {
        log.warn(
                Markers.appendEntries(errorLog.fields()),
                errorLog.summary()
        );
    }
}
