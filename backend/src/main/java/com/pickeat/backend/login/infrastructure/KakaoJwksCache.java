package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.jwk.JWKSet;
import com.pickeat.backend.global.exception.ExternalApiException;
import java.time.Duration;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestClient;

@RequiredArgsConstructor
public class KakaoJwksCache {

    private final String jwksUrl;
    private final RestClient restClient;
    private final Duration ttlCacheDuration = Duration.ofMinutes(15);

    private JWKSet cachedjwkSet;
    private Instant expiredAt;

    public JWKSet getJwkSet() {

        var now = Instant.now();

        try {
            if (cachedjwkSet != null && expiredAt != null && now.isBefore(expiredAt)) {
                return cachedjwkSet;
            }
            String jwtSet = restClient.get()
                    .uri(jwksUrl)
                    .retrieve()
                    .body(String.class);
            JWKSet freshJwkSet = JWKSet.parse(jwtSet);
            cachedjwkSet = freshJwkSet;
            expiredAt = now.plus(ttlCacheDuration);
            return freshJwkSet;
        } catch (Exception e) {
            throw new ExternalApiException(e.getMessage(), "kakao", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void refresh() {
        try {
            var now = Instant.now();
            String jwtSet = restClient.get()
                    .uri(jwksUrl)
                    .retrieve()
                    .body(String.class);
            JWKSet freshJwkSet = JWKSet.parse(jwtSet);
            cachedjwkSet = freshJwkSet;
            expiredAt = now.plus(ttlCacheDuration);
        } catch (Exception e) {
            throw new ExternalApiException(e.getMessage(), "kakao", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
