package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.global.exception.ExternalApiException;
import io.github.resilience4j.common.retry.configuration.RetryConfigCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.ResourceAccessException;

@Configuration
public class ResiliencePolicyConfig {

    @Bean
    public RetryConfigCustomizer kakaoSearchRetryCustomizer() {
        return RetryConfigCustomizer.of("kakaoSearch", builder -> builder
                .retryOnException(ex -> {
                    if (ex instanceof ResourceAccessException) {
                        return true;
                    }
                    if (ex instanceof ExternalApiException e) {
                        int sc = e.getStatusCode();
                        return sc >= 500 && sc < 600;
                    }
                    return false;
                })
        );
    }
}
