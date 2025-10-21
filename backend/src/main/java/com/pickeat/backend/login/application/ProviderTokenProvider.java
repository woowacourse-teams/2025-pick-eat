package com.pickeat.backend.login.application;

import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import io.jsonwebtoken.Claims;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ProviderTokenProvider {
    private static final String PROVIDER_CLAIM_KEY = "provider";

    private final JwtProvider jwtProvider;
    private final long expirationMillis;

    public ProviderTokenProvider(JwtProvider jwtProvider,
                                 @Value("${provider.jwt.expiration}") long expirationMillis) {
        this.jwtProvider = jwtProvider;
        this.expirationMillis = expirationMillis;
    }

    public TokenResponse createToken(Long providerId, String provider) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(PROVIDER_CLAIM_KEY, provider);
        return jwtProvider.createTokenWithClaims(providerId, expirationMillis, claims);
    }

    public Long getProviderId(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getProvider(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return claims.get(PROVIDER_CLAIM_KEY, String.class);
    }
}
