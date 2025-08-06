package com.pickeat.backend.login.application;

import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserTokenProvider {

    private final JwtProvider jwtProvider;
    private final long expirationMillis;

    public UserTokenProvider(JwtProvider jwtProvider,
                             @Value("${user.jwt.expiration}") Long expirationMillis) {

        this.jwtProvider = jwtProvider;
        this.expirationMillis = expirationMillis;
    }

    public TokenResponse createToken(Long userId) {
        return jwtProvider.createToken(userId, expirationMillis);
    }

    public Long getUserId(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Long.parseLong(claims.getSubject());
    }
}
