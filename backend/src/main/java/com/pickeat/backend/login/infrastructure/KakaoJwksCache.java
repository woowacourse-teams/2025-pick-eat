package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import java.time.Duration;
import java.time.Instant;

public class KakaoJwksCache {

    private static final Duration TTLCACHEDURATION = Duration.ofMinutes(15);
    private volatile JWKSet cachedJwkSet;
    private volatile Instant expiresAt;

    public JWK getJwkByKeyId(String kid) {
        if (cachedJwkSet == null) {
            return null;
        }
        return cachedJwkSet.getKeyByKeyId(kid);
    }

    public boolean needsRefresh() {
        return cachedJwkSet == null
                || expiresAt == null
                || Instant.now().isAfter(expiresAt);
    }

    public synchronized void refresh(JWKSet jwkSet) {
        if (jwkSet != null) {
            this.cachedJwkSet = jwkSet;
            this.expiresAt = Instant.now().plus(TTLCACHEDURATION);
        }
    }
}
