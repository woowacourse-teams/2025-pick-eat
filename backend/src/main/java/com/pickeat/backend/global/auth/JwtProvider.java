package com.pickeat.backend.global.auth;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component

public class JwtProvider {

    private final SecretKey secretKey;

    public JwtProvider(@Value("${jwt.secretKey}") String secret) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(Long id, long expirationMillis) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .subject(String.valueOf(id))
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String createProviderToken(Long providerId, String provider) {
        return Jwts.builder()
                .subject(String.valueOf(providerId))
                .claim("provider", provider)
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 5)) // 5분
                .signWith(secretKey)
                .compact();
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

    public ProviderInfo getProviderInfo(String token) {
        Claims claims = getClaims(token);
        String provider = claims.get("provider", String.class);
        Long providerId = Long.valueOf(claims.getSubject());

        if (provider == null || provider.isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }

        return new ProviderInfo(providerId, provider);
    }
}
