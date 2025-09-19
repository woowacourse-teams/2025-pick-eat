package com.pickeat.backend.fake.login;

import com.nimbusds.jose.jwk.JWKSet;
import com.pickeat.backend.login.infrastructure.KakaoJwksClient;

public class FakeKakaoJwksClient extends KakaoJwksClient {

    private final JWKSet fakeJwkSet;

    public FakeKakaoJwksClient(JWKSet fakeJwkSet) {
        super(null);
        this.fakeJwkSet = fakeJwkSet;
    }

    @Override
    public JWKSet fetchJwkSet() {
        return fakeJwkSet;
    }
}
