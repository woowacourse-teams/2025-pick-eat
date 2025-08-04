package com.pickeat.backend.login.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class JwtTokenProviderTest {

    private final String secret = "my-super-secret-key-that-is-very-long-and-secure";
    private final long expirationMillis = 1000 * 60 * 60; // 1시간

    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider(secret, expirationMillis);

    @Test
    void JWT_토큰_생성_성공() {
        // given
        Long userId = 1L;

        // when
        String token = jwtTokenProvider.createToken(userId);

        // then
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();

        assertAll(() -> assertThat(claims.getSubject()).isEqualTo(userId.toString()),
                () -> assertThat(claims.getExpiration()).isAfter(new Date()));
    }

    @Nested
    @DisplayName("getUserId 메소드는")
    class 토큰_조회_케이스 {

        @Test
        void 유효한_토큰() {
            // given
            Long userId = 1L;
            String token = jwtTokenProvider.createToken(userId);

            // when
            Long extractedUserId = jwtTokenProvider.getUserId(token);

            // then
            assertThat(extractedUserId).isEqualTo(userId);
        }

        @Test
        void 토큰이_null() {
            // when & then
            BusinessException exception = assertThrows(BusinessException.class, () -> {
                jwtTokenProvider.getUserId(null);
            });
            assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.TOKEN_IS_EMPTY);
        }

        @Test
        void 토큰이_비어있음() {
            // when & then
            BusinessException exception = assertThrows(BusinessException.class, () -> {
                jwtTokenProvider.getUserId("");
            });
            assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.TOKEN_IS_EMPTY);
        }

        @Test
        void 유효하지_않은_토큰() {
            // given
            String invalidToken = "invalid-token";

            // when & then
            BusinessException exception = assertThrows(BusinessException.class, () -> {
                jwtTokenProvider.getUserId(invalidToken);
            });
            assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.INVALID_TOKEN);
        }

        @Test
        void 만료된_토큰() {
            // given
            JwtTokenProvider expiredTokenProvider = new JwtTokenProvider(secret, -1L);
            String expiredToken = expiredTokenProvider.createToken(1L);

            // when & then
            BusinessException exception = assertThrows(BusinessException.class, () -> {
                jwtTokenProvider.getUserId(expiredToken);
            });
            assertThat(exception.getErrorCode()).isEqualTo(ErrorCode.INVALID_TOKEN);
        }
    }
}
