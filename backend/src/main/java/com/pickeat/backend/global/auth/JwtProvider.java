package com.pickeat.backend.global.auth;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component

public class JwtProvider {

    private final SecretKey secretKey;

    public JwtProvider(@Value("${jwt.secretKey}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public TokenResponse createToken(Long id, long expirationMillis) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);

        return TokenResponse.from(
                Jwts.builder()
                        .subject(String.valueOf(id))
                        .issuedAt(now)
                        .expiration(expiryDate)
                        .signWith(secretKey)
                        .compact()
        );
    }

    public TokenResponse createTokenWithClaims(Long id, long expirationMillis, Map<String, Object> extraClaims) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);

        JwtBuilder builder = Jwts.builder();

        // (1) 먼저 사용자 정의 claims 추가
        if (extraClaims != null && !extraClaims.isEmpty()) {
            // 예약 클레임(sub, iat, exp) 덮어쓰기 방지
            Map<String, Object> safeClaims = new HashMap<>(extraClaims);
            safeClaims.keySet().removeAll(Set.of("sub", "iat", "exp"));
            builder.claims(safeClaims);
        }

        // (2) 그 다음 JWT의 예약 클레임 설정
        builder.subject(String.valueOf(id))
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey);

        // (3) 최종 토큰 생성
        return TokenResponse.from(builder.compact());
    }


    public Claims getClaims(String token) {
        if (token == null || token.isEmpty()) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }

        try {
            return Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getEncoded()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new BusinessException(ErrorCode.EXPIRED_TOKEN);
        } catch (JwtException e) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
    }
}
