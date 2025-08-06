package com.pickeat.backend.login.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.login.application.LoginClient;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;


@RequiredArgsConstructor
public class KakaoLoginClient implements LoginClient {

    private static final String URI = "/oauth/token?grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s";
    private static final String PLATFORM_NAME = "kakao";

    private final String clientId;
    private final Map<String, String> redirectUrls;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Override
    public String getIdToken(String code, String redirectUrlType) {
        // TODO: 개발 서버와 배포서버가 분리 된다면 불필요한 코드가 될 것 같음.
        String redirectUrl = resolveRedirectUri(redirectUrlType);
        String uri = String.format(URI, clientId, redirectUrl, code);

        try {
            return callApi(uri).idToken();
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private TokenResponse callApi(String uri) {

        return restClient.post().uri(uri).retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> handleError(response))
                .body(TokenResponse.class);
    }

    private void handleError(ClientHttpResponse response) {
        try {
            JsonNode errorRoot = objectMapper.readTree(response.getBody());
            String kakaoErrorMessage = objectMapper.writeValueAsString(errorRoot);
            throw new ExternalApiException(kakaoErrorMessage, PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    private String resolveRedirectUri(String type) {
        if (!redirectUrls.containsKey(type)) {
            throw new BusinessException(ErrorCode.INVALID_REDIRECT_TYPE);
        }
        return redirectUrls.get(type);
    }
}
