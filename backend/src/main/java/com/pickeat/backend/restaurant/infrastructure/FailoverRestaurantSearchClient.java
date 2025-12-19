package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import io.github.resilience4j.circuitbreaker.CallNotPermittedException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;

@Profile({"local", "prod", "dev"})
@Primary
@Slf4j
@Component
public class FailoverRestaurantSearchClient implements RestaurantSearchClient {

    private final RestaurantSearchClient primaryClient;
    private final RestaurantSearchClient secondaryClient;
    private final Counter fallbackCounter;

    public FailoverRestaurantSearchClient(
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
        log.warn("primary CB OPEN -> fallback to secondary. request={}", request, e);

        fallbackCounter.increment();

        return secondaryClient.getRestaurants(request);
    }

    private List<RestaurantRequest> fallback(RestaurantSearchRequest request, ExternalApiException e) {
        int statusCode = e.getStatusCode();

        if (statusCode == 429) {
            log.warn("[RestaurantSearch] primary failed (status={}) -> fallback to secondary. request={}, msg={}",
                    statusCode, request, e.getMessage(), e);
            fallbackCounter.increment();

            return secondaryClient.getRestaurants(request);
        }

        if (statusCode >= 500 && statusCode < 600) {
            log.warn("[RestaurantSearch] primary failed (status={}) -> fallback to secondary. request={}, msg={}",
                    statusCode, request, e.getMessage(), e);

            fallbackCounter.increment();

            return secondaryClient.getRestaurants(request);
        }

        throw e;
    }

    private List<RestaurantRequest> fallback(RestaurantSearchRequest request, ResourceAccessException e) {
        log.warn("[RestaurantSearch] primary timeout -> fallback to secondary. request={}", request, e);

        fallbackCounter.increment();

        return secondaryClient.getRestaurants(request);
    }
}
