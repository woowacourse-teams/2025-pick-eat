package com.pickeat.backend.login.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.pickeat.backend.global.exception.BusinessException;
import java.security.interfaces.RSAPublicKey;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class KakaoOidcPublicKeyProviderTest {

    private KakaoJwksClient kakaoJwksClient;
    private KakaoJwksCache kakaoJwksCache;
    private KakaoOidcPublicKeyProvider kakaoOidcPublicKeyProvider;

    @BeforeEach
    void beforeEach() {
        kakaoJwksClient = mock(KakaoJwksClient.class);
        kakaoJwksCache = mock(KakaoJwksCache.class);
        kakaoOidcPublicKeyProvider = new KakaoOidcPublicKeyProvider(kakaoJwksClient, kakaoJwksCache);
    }

    private RSAKey createRsaKey(String kid) throws Exception {
        return new RSAKeyGenerator(2048)
                .keyID(kid)
                .generate();
    }

    @Nested
    class 공개키_조회_케이스 {

        @Test
        void 캐시가_유효하면_갱신없이_캐시에서_공개키를_조회한다() throws Exception {
            // given
            RSAKey rsaKey = createRsaKey("test-kid");
            when(kakaoJwksCache.needsRefresh()).thenReturn(false);
            when(kakaoJwksCache.getJwkByKeyId("test-kid")).thenReturn(rsaKey);

            // when
            RSAPublicKey publicKey = kakaoOidcPublicKeyProvider.getPublicKey("test-kid");

            // then
            assertThat(publicKey).isEqualTo(rsaKey.toRSAPublicKey());
            verify(kakaoJwksClient, never()).fetchJwkSet();
        }

        @Test
        void 캐시가_만료되었으면_갱신_후_공개키를_조회한다() throws Exception {
            // given
            RSAKey rsaKey = createRsaKey("test-kid");
            JWKSet jwkSet = new JWKSet(rsaKey);
            when(kakaoJwksCache.needsRefresh()).thenReturn(true);
            when(kakaoJwksClient.fetchJwkSet()).thenReturn(jwkSet);
            when(kakaoJwksCache.getJwkByKeyId("test-kid")).thenReturn(rsaKey);

            // when
            RSAPublicKey publicKey = kakaoOidcPublicKeyProvider.getPublicKey("test-kid");

            // then
            assertThat(publicKey).isEqualTo(rsaKey.toRSAPublicKey());
            verify(kakaoJwksClient).fetchJwkSet();
        }

        @Test
        void 캐시에_없는_kid이면_갱신을_재시도하고_그래도_없으면_예외_발생() throws Exception {
            // given
            JWKSet jwkSet = new JWKSet(createRsaKey("other-kid"));
            when(kakaoJwksCache.needsRefresh()).thenReturn(false);
            when(kakaoJwksClient.fetchJwkSet()).thenReturn(jwkSet);
            when(kakaoJwksCache.getJwkByKeyId("missing-kid")).thenReturn(null);

            // when & then
            assertThatThrownBy(() -> kakaoOidcPublicKeyProvider.getPublicKey("missing-kid"))
                    .isInstanceOf(BusinessException.class);
            verify(kakaoJwksClient).fetchJwkSet();
        }

        @Test
        void RSA_키가_아닌_JWK이면_예외_발생() {
            // given
            JWK nonRsaJwk = mock(JWK.class);
            when(kakaoJwksCache.needsRefresh()).thenReturn(false);
            when(kakaoJwksCache.getJwkByKeyId("ec-kid")).thenReturn(nonRsaJwk);

            // when & then
            assertThatThrownBy(() -> kakaoOidcPublicKeyProvider.getPublicKey("ec-kid"))
                    .isInstanceOf(BusinessException.class);
        }
    }
}
