package com.pickeat.backend.login.application;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtOidProvider {

    private final OidcPublicKeyProvider oidcPublicKeyProvider;

    public Long extractProviderIdFromIdToken(String idToken) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(idToken);
            validateJwtHeader(signedJWT);
            String kId = extractKid(signedJWT);
            validateIdToken(signedJWT, oidcPublicKeyProvider.getPublicKey(kId));

            Long providerId = Long.parseLong(signedJWT.getJWTClaimsSet().getSubject());

            return providerId;

        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private void validateJwtHeader(SignedJWT signedJWT) {
        validateAlgIsRs256(signedJWT);
    }

    private void validateAlgIsRs256(SignedJWT jws) {
        if (!JWSAlgorithm.RS256.equals(jws.getHeader().getAlgorithm())) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
    }

    private void validateIdToken(SignedJWT signedJWT, RSAPublicKey publicKey) {
        try {
            if (!signedJWT.verify(new RSASSAVerifier(publicKey))) {
                throw new BusinessException(ErrorCode.INVALID_TOKEN);
            }
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.HEADER_IS_EMPTY);
        }
    }

    private String extractKid(SignedJWT jws) {
        String kId = jws.getHeader().getKeyID();
        if (kId == null || kId.isBlank()) {
            throw new BusinessException(ErrorCode.TOKEN_IS_EMPTY);
        }
        return kId;
    }
}
