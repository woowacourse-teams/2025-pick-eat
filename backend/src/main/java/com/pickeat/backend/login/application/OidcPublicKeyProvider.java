package com.pickeat.backend.login.application;

import java.security.interfaces.RSAPublicKey;

public interface OidcPublicKeyProvider {

    RSAPublicKey getPublicKey(String kId);
}
