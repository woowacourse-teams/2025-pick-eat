package com.pickeat.backend.restaurant.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@AllArgsConstructor
@ConfigurationProperties(prefix = "external.kakao.map")
public class KakaoMapApiProperties {
    String baseUrl;
    String restApiKey;
    int readTimeout;
    int connectTimeout;
}
