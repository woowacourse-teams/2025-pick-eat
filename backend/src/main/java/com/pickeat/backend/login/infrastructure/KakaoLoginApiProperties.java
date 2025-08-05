package com.pickeat.backend.login.infrastructure;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@AllArgsConstructor
@ConfigurationProperties(prefix = "external.kakao.login")
public class KakaoLoginApiProperties {

    @NotBlank(message = "baseUrl이 누락되었습니다.")
    private String baseUrl;
    @NotBlank(message = "restApiKey가 누락되었습니다.")
    private String restApiKey;
    @NotNull(message = "readTimeOut이 누락되었습니다.")
    private Integer readTimeout;
    @NotNull(message = "connectTimeout이 누락되었습니다.")
    private Integer connectTimeout;
    @NotBlank(message = "productionRedirectUrl이 누락되었습니다.")
    private String productionRedirectUrl;
    @NotBlank(message = "developmentRedirectUrl이 누락되었습니다.")
    private String developmentRedirectUrl;

    public Map<String, String> redirectUrlMap() {
        return Map.of(
                "production", productionRedirectUrl,
                "development", developmentRedirectUrl
        );
    }
}
