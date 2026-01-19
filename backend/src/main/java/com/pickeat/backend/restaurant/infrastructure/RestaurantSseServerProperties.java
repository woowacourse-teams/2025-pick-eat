package com.pickeat.backend.restaurant.infrastructure;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Validated
@AllArgsConstructor
@ConfigurationProperties(prefix = "sse.server")
public class RestaurantSseServerProperties {

    @NotBlank(message = "baseUrl이 누락되었습니다.")
    private String baseUrl;
    @NotBlank(message = "restApiKey가 누락되었습니다.")
    private String restApiKey;
    @NotNull(message = "readTimeOut이 누락되었습니다.")
    private Integer readTimeout;
    @NotNull(message = "connectTimeout이 누락되었습니다.")
    private Integer connectTimeout;
}
