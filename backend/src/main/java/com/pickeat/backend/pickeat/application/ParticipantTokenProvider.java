package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ParticipantTokenProvider {

    private final JwtProvider jwtProvider;
    private final long expirationMillis;

    public ParticipantTokenProvider(JwtProvider jwtProvider,
                                    @Value("${participant.jwt.expiration}") long expirationMillis) {
        this.jwtProvider = jwtProvider;
        this.expirationMillis = expirationMillis;
    }

    public TokenResponse createToken(Long participant) {
        return jwtProvider.createToken(participant, expirationMillis);
    }

    public Long getParticipantId(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Long.parseLong(claims.getSubject());
    }
}
