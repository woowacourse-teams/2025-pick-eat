package com.pickeat.backend.login.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class KakaoJwksCacheTest {

    private KakaoJwksCache kakaoJwksCache;

    @BeforeEach
    void beforeEach() {
        kakaoJwksCache = new KakaoJwksCache();
    }

    private JWKSet createJwkSet(String kid) throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair keyPair = generator.generateKeyPair();

        RSAKey rsaKey = new RSAKey.Builder((RSAPublicKey) keyPair.getPublic())
                .privateKey((RSAPrivateKey) keyPair.getPrivate())
                .keyID(kid)
                .build();

        return new JWKSet(rsaKey);
    }

    @Nested
    class 캐시_갱신_필요여부_판단_케이스 {

        @Test
        void 캐시가_비어있으면_갱신이_필요하다() {
            // when & then
            assertThat(kakaoJwksCache.needsRefresh()).isTrue();
        }

        @Test
        void 갱신_직후에는_갱신이_필요하지_않다() throws Exception {
            // given
            JWKSet jwkSet = createJwkSet("test-kid");

            // when
            kakaoJwksCache.refresh(jwkSet);

            // then
            assertThat(kakaoJwksCache.needsRefresh()).isFalse();
        }
    }

    @Nested
    class 캐시_조회_케이스 {

        @Test
        void 캐시에_없는_kid로_조회하면_null을_반환한다() {
            // when
            JWK jwk = kakaoJwksCache.getJwkByKeyId("unknown-kid");

            // then
            assertThat(jwk).isNull();
        }

        @Test
        void 갱신된_캐시에서_kid로_조회하면_해당_JWK를_반환한다() throws Exception {
            // given
            JWKSet jwkSet = createJwkSet("test-kid");
            kakaoJwksCache.refresh(jwkSet);

            // when
            JWK jwk = kakaoJwksCache.getJwkByKeyId("test-kid");

            // then
            assertThat(jwk).isNotNull();
            assertThat(jwk.getKeyID()).isEqualTo("test-kid");
        }

        @Test
        void null_jwkSet으로_갱신하면_기존_캐시가_유지된다() throws Exception {
            // given
            JWKSet jwkSet = createJwkSet("test-kid");
            kakaoJwksCache.refresh(jwkSet);

            // when
            kakaoJwksCache.refresh(null);

            // then
            assertThat(kakaoJwksCache.getJwkByKeyId("test-kid")).isNotNull();
        }
    }
}
