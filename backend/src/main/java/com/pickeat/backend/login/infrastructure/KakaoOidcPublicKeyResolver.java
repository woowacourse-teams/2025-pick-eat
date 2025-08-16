package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.SignedJWT;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.login.application.OidcPublicKeyResolver;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
public class KakaoOidcPublicKeyResolver implements OidcPublicKeyResolver {

    private final KakaoJwksCache kakaoJwksCache;

    @Override
    public RSAPublicKey getPublicKey(SignedJWT signedJWT) {
        validateAlgIsRs256(signedJWT);
        String kid = extractKid(signedJWT);
        RSAKey rsaKey = resolveRsaJwkByKid(kid);
        return toRsaPublicKey(rsaKey);
    }

    private void validateAlgIsRs256(SignedJWT jws) {
        if (!JWSAlgorithm.RS256.equals(jws.getHeader().getAlgorithm())) {
            throw new ExternalApiException("허용되지 않은 알고리즘입니다.", "kakao", HttpStatus.UNAUTHORIZED);
        }
    }

    private String extractKid(SignedJWT jws) {
        String kid = jws.getHeader().getKeyID();
        if (kid == null || kid.isBlank()) {
            throw new ExternalApiException("인증 토큰 형식이 잘못되었습니다.", "kakao", HttpStatus.UNAUTHORIZED);
        }
        return kid;
    }

    private RSAKey resolveRsaJwkByKid(String kid) {
        JWK jwk = kakaoJwksCache.getJwkSet().getKeyByKeyId(kid);
        if (jwk == null) {

            throw new ExternalApiException("인증 토큰 형식이 잘못되었습니다.", "kakao", HttpStatus.UNAUTHORIZED);
        }
        if (!(jwk instanceof RSAKey)) {
            throw new ExternalApiException("인증 토큰 형식이 잘못되었습니다.", "kakao", HttpStatus.UNAUTHORIZED);
        }
        return (RSAKey) jwk;
    }

    private RSAPublicKey toRsaPublicKey(RSAKey rsaKey) {
        try {
            return rsaKey.toRSAPublicKey();
        } catch (Exception e) {
            throw new ExternalApiException("인증 토큰 형식이 잘못되었습니다.", "kakao", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
