package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jwt.SignedJWT;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.OidcPublicKeyResolver;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;

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
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
    }

    private String extractKid(SignedJWT jws) {
        String kid = jws.getHeader().getKeyID();
        if (kid == null || kid.isBlank()) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
        return kid;
    }

    private RSAKey resolveRsaJwkByKid(String kid) {
        RSAKey rsaKey = tryResolve(kid);
        if (rsaKey != null) {
            return rsaKey;
        }

        kakaoJwksCache.refresh();
        rsaKey = tryResolve(kid);
        if (rsaKey != null) {
            return rsaKey;
        }
        throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
    }

    private RSAKey tryResolve(String kid) {
        var jwk = kakaoJwksCache.getJwkSet().getKeyByKeyId(kid);
        if (jwk == null) {
            return null;
        }
        if (!(jwk instanceof RSAKey)) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
        return (RSAKey) jwk;
    }

    private RSAPublicKey toRsaPublicKey(RSAKey rsaKey) {
        try {
            return rsaKey.toRSAPublicKey();
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
    }
}
