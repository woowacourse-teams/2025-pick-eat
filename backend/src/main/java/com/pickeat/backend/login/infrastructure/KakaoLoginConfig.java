package com.pickeat.backend.login.infrastructure;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
@RequiredArgsConstructor
public class KakaoLoginConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public KakaoLoginClient kakaoLoginClient(KakaoLoginApiProperties properties) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(properties.getConnectTimeout());
        factory.setReadTimeout(properties.getReadTimeout());

        RestClient restClient = RestClient.builder().requestFactory(factory)
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8").build();

        return new KakaoLoginClient(properties.getRestApiKey(), properties.redirectUrlMap(), restClient,
                objectMapper);
    }
}
