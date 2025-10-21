package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import io.jsonwebtoken.Claims;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ParticipantTokenProvider {

    private static final String PICKEAT_CODE_CLAIM_KEY = "pickeatCode";

    private final JwtProvider jwtProvider;
    private final long expirationMillis;

    public ParticipantTokenProvider(JwtProvider jwtProvider,
                                    @Value("${participant.jwt.expiration}") long expirationMillis) {
        this.jwtProvider = jwtProvider;
        this.expirationMillis = expirationMillis;
    }

    public TokenResponse createToken(Participant participant, Pickeat pickeat) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(PICKEAT_CODE_CLAIM_KEY, pickeat.getCode().getValue().toString());
        return jwtProvider.createTokenWithClaims(participant.getId(), expirationMillis, claims);
    }

    public Long getParticipantId(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public String getRawPickeatCode(String token) {
        Claims claims = jwtProvider.getClaims(token);
        return claims.get(PICKEAT_CODE_CLAIM_KEY, String.class);
    }
}
