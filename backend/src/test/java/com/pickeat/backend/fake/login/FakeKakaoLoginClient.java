package com.pickeat.backend.fake.login;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.pickeat.backend.login.application.LoginClient;
import java.security.PrivateKey;
import java.util.Date;
import java.util.concurrent.atomic.AtomicInteger;

public class FakeKakaoLoginClient implements LoginClient {

    private final PrivateKey privateKey;
    private AtomicInteger counter;

    public FakeKakaoLoginClient(PrivateKey privateKey) {
        this.privateKey = privateKey;
        this.counter = new AtomicInteger(0);
    }

    @Override
    public String getIdToken(String code, String redirectUrl) {
        try {
            counter.setPlain(counter.get() + 1);
            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(String.valueOf(counter.get()))
                    .issuer("https://kauth.kakao.com")
                    .audience("your-client-id")
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + 3600 * 1000))
                    .build();
            JWSHeader header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                    .keyID("test-kid")
                    .type(JOSEObjectType.JWT)
                    .build();
            SignedJWT signedJWT = new SignedJWT(header, claims);
            signedJWT.sign(new RSASSASigner(privateKey));
            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("테스트 IdToken을 생성하는데 오류가 발생했습니다.");
        }
    }
}
