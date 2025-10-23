package com.pickeat.backend.login.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.login.application.LoginClient;
import com.pickeat.backend.login.application.OidcPublicKeyProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Profile({"local", "dev", "prod"})
@Configuration
@RequiredArgsConstructor
public class KakaoLoginConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public LoginClient kakaoLoginClient(KakaoLoginApiProperties properties) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getConnectTimeout());
        factory.setReadTimeout(properties.getReadTimeout());

        RestClient restClient = RestClient.builder().requestFactory(factory)
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8").build();

        return new KakaoLoginClient(properties.getRestApiKey(), restClient,
                objectMapper);
    }

    @Bean
    public OidcPublicKeyProvider kakaOidcPublicKeyProvider(KakaoJwksClient kakaoJwksClient,
            KakaoJwksCache kakaoJwksCache) {

        return new KakaoOidcPublicKeyProvider(kakaoJwksClient, kakaoJwksCache);
    }

    @Bean
    public KakaoJwksCache kakaoJwksCache() {
        return new KakaoJwksCache();
    }

    @Bean
    public KakaoJwksClient kakaoJwksClient(KakaoJwtRSAProperties properties) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getConnectTimeout());
        factory.setReadTimeout(properties.getReadTimeout());

        RestClient restClient = RestClient.builder().requestFactory(factory)
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8").build();

        return new KakaoJwksClient(restClient);
    }
}
