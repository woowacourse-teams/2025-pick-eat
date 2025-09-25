package com.pickeat.backend.fake.login;

import com.pickeat.backend.login.application.OidcPublicKeyProvider;
import java.security.interfaces.RSAPublicKey;

public class FakeKakaoOidcPublicKeyProvider implements OidcPublicKeyProvider {

    private final RSAPublicKey fakePublicKey;

    public FakeKakaoOidcPublicKeyProvider(RSAPublicKey fakePublicKey) {
        this.fakePublicKey = fakePublicKey;
    }

    @Override
    public RSAPublicKey getPublicKey(String kId) {
        return fakePublicKey;
    }
}
