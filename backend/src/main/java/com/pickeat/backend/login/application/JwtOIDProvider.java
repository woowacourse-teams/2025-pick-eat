package com.pickeat.backend.login.application;

import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.security.interfaces.RSAPublicKey;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtOIDProvider {

    private final OidcPublicKeyResolver oidcPublicKeyResolver;

    public Long extractProviderIdFromIdToken(String idToken) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(idToken);
            validateIdToken(signedJWT, oidcPublicKeyResolver.getPublicKey(signedJWT));

            Long providerId = Long.parseLong(signedJWT.getJWTClaimsSet().getSubject());

            return providerId;

        } catch (Exception e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private void validateIdToken(SignedJWT signedJWT, RSAPublicKey publicKey) {
        try {
            signedJWT.verify(new RSASSAVerifier(publicKey));
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.HEADER_IS_EMPTY);
        }
    }
}
