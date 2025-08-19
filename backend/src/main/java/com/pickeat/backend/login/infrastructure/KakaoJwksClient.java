package com.pickeat.backend.login.infrastructure;

import com.nimbusds.jose.jwk.JWKSet;
import com.pickeat.backend.global.exception.ExternalApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.RestClient;

@RequiredArgsConstructor
public class KakaoJwksClient {

    private static final String URI = "https://kauth.kakao.com/.well-known/jwks.json";
    private final RestClient restClient;

    public JWKSet fetchJwkSet() {
        try {
            String jwtSet = restClient.get()
                    .uri(URI)
                    .retrieve()
                    .body(String.class);
            JWKSet freshJwkSet = JWKSet.parse(jwtSet);
            return freshJwkSet;
        } catch (Exception e) {
            throw new ExternalApiException(e.getMessage(), "kakao", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
