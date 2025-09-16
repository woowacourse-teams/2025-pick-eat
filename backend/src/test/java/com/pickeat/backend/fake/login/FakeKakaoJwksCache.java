package com.pickeat.backend.fake.login;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.pickeat.backend.login.infrastructure.KakaoJwksCache;

public class FakeKakaoJwksCache extends KakaoJwksCache {

    private final JWKSet fakeJwkSet;

    public FakeKakaoJwksCache(JWKSet fakeJwkSet) {
        this.fakeJwkSet = fakeJwkSet;
    }

    @Override
    public JWK getJwkByKeyId(String kid) {
        return fakeJwkSet.getKeyByKeyId(kid);
    }

    @Override
    public boolean needsRefresh() {
        return false;
    }

    @Override
    public synchronized void refresh(JWKSet jwkSet) {

    }
}
