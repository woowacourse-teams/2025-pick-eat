package com.pickeat.backend.login.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.user.domain.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.junit.jupiter.api.Test;

class JwtTokenProviderTest {

    private final String secret = "my-super-secret-key-that-is-very-long-and-secure";
    private final long expirationMillis = 1000 * 60 * 60; // 1시간

    private final JwtTokenProvider jwtTokenProvider = new JwtTokenProvider(secret, expirationMillis);

    @Test
    void JWT_토큰_생성_성공() {
        // given
        User user = new User("nickname", 123L, "kakao");

        // when
        String token = jwtTokenProvider.createToken(user);

        // then
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(token).getBody();

        assertAll(() -> assertThat(claims.getSubject()).isEqualTo("nickname"),
                () -> assertThat(claims.getIssuedAt()).isBeforeOrEqualsTo(new Date()),
                () -> assertThat(claims.getExpiration()).isAfter(new Date()));
    }
}
