package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.RSAKey;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.OidcPublicKeyProvider;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class KakaoOidcPublicKeyProvider implements OidcPublicKeyProvider {

    private final KakaoJwksClient kakaoJwksClient;
    private final KakaoJwksCache kakaoJwksCache;

    @Override
    public RSAPublicKey getPublicKey(String kId) {
        RSAKey rsaKey = findRsaKeyByKId(kId);
        return convertToRsaPublicKey(rsaKey);
    }

    private RSAKey findRsaKeyByKId(String kId) {
        if (kakaoJwksCache.needsRefresh()) {
            kakaoJwksCache.refresh(kakaoJwksClient.fetchJwkSet());
        }

        JWK jwk = kakaoJwksCache.getJwkByKeyId(kId);

        if (jwk == null) {
            // 만약 KID에 해당하는 JWK가 캐시에 없다면, 새로 갱신을 시도합니다. 이유: 15분 사이에 공개키가 바뀌었을 수 있기 때문.
            kakaoJwksCache.refresh(kakaoJwksClient.fetchJwkSet());
            jwk = kakaoJwksCache.getJwkByKeyId(kId);
            if (jwk == null) {
                throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
            }
        }

        if (!(jwk instanceof RSAKey)) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
        return (RSAKey) jwk;
    }

    private RSAPublicKey convertToRsaPublicKey(RSAKey rsaKey) {
        try {
            return rsaKey.toRSAPublicKey();
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INVALID_TOKEN);
        }
    }
}
