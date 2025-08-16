package com.pickeat.backend.login.application;

import com.nimbusds.jwt.SignedJWT;
import java.security.interfaces.RSAPublicKey;

public interface OidcPublicKeyResolver {

    RSAPublicKey getPublicKey(SignedJWT signedJWT);
}
