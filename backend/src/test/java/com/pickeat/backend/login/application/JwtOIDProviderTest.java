package com.pickeat.backend.login.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.junit.jupiter.api.Test;

class JwtOIDProviderTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtOIDProvider jwtOIDProvider = new JwtOIDProvider(objectMapper);

    @Test
    void ID토큰에서_sub_추출_성공() {
        // given
        String headerJson = "{\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"abc123\"}";
        String payloadJson = "{\"sub\":123456789}";

        String header = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(headerJson.getBytes(StandardCharsets.UTF_8));
        String payload = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));
        String signature = "dummy-signature";

        String fakeJwt = String.join(".", header, payload, signature);

        // when
        Long providerId = jwtOIDProvider.extractProviderIdFromIdToken(fakeJwt);

        // then
        assertThat(providerId).isEqualTo(123456789L);
    }

    @Test
    void 잘못된_JWT_포맷이면_예외() {
        // given
        String invalidJwt = "invalid.jwt";

        // when & then
        assertThatThrownBy(() -> jwtOIDProvider.extractProviderIdFromIdToken(invalidJwt)).isInstanceOf(
                BusinessException.class).hasFieldOrPropertyWithValue("errorCode", ErrorCode.INTERNAL_SERVER_ERROR);
    }

    @Test
    void sub가_없는_페이로드면_예외() {
        // given
        String headerJson = "{\"alg\":\"RS256\",\"typ\":\"JWT\",\"kid\":\"abc123\"}";
        String payloadJson = "{}";

        String header = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(headerJson.getBytes(StandardCharsets.UTF_8));
        String payload = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payloadJson.getBytes(StandardCharsets.UTF_8));
        String signature = "dummy-signature";

        String fakeJwt = String.join(".", header, payload, signature);

        // when & then
        assertThatThrownBy(() -> jwtOIDProvider.extractProviderIdFromIdToken(fakeJwt)).isInstanceOf(
                BusinessException.class).hasFieldOrPropertyWithValue("errorCode", ErrorCode.INTERNAL_SERVER_ERROR);
    }
}
