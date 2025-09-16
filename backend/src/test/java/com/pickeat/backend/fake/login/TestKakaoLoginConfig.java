package com.pickeat.backend.fake.login;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.pickeat.backend.login.application.LoginClient;
import com.pickeat.backend.login.application.OidcPublicKeyProvider;
import com.pickeat.backend.login.infrastructure.KakaoJwksCache;
import com.pickeat.backend.login.infrastructure.KakaoJwksClient;
import com.pickeat.backend.login.infrastructure.KakaoJwtRSAProperties;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration
public class TestKakaoLoginConfig {

    private final RSAPublicKey publicKey;
    private final RSAPrivateKey privateKey;
    private final JWKSet jwkSet;

    public TestKakaoLoginConfig() throws NoSuchAlgorithmException {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        this.publicKey = (RSAPublicKey) keyPair.getPublic();
        this.privateKey = (RSAPrivateKey) keyPair.getPrivate();

        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .keyID("test-kid")
                .build();
        this.jwkSet = new JWKSet(rsaKey);
    }

    @Bean
    public LoginClient kakaoLoginClient() {
        return new FakeKakaoLoginClient(privateKey);
    }

    @Bean
    public OidcPublicKeyProvider kakaOidcPublicKeyProvider(
            KakaoJwksClient kakaoJwksClient,
            KakaoJwksCache kakaoJwksCache
    ) {
        return new FakeKakaoOidcPublicKeyProvider(publicKey);
    }

    @Bean
    public KakaoJwksCache kakaoJwksCache() {
        return new FakeKakaoJwksCache(jwkSet);
    }

    @Bean
    public KakaoJwksClient kakaoJwksClient(KakaoJwtRSAProperties properties) {
        return new FakeKakaoJwksClient(jwkSet);
    }
}
