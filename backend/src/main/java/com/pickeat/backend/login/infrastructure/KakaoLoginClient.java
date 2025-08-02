package com.pickeat.backend.login.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.login.application.dto.KakaoTokenResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;


@RequiredArgsConstructor
public class KakaoLoginClient {

    private static final String URI = "/oauth/token?grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s";
    private static final String PLATFORM_NAME = "kakao";
    //TODO: 프론트에서 URI가 설정되면 수정될 내용. applicaiton.properties에서 관리 예정
    private static final String REDIRECT_URI = "http://localhost:8080/callback";

    private final String clientId;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public String getIdTokenFromKakao(String code) {
        String uri = String.format(URI, clientId, REDIRECT_URI, code);

        try {
            return callApi(uri).idToken();
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private KakaoTokenResponse callApi(String uri) {

        return restClient.post().uri(uri).retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> handleError(response))
                .body(KakaoTokenResponse.class);
    }

    private void handleError(ClientHttpResponse response) {
        try {
            JsonNode errorRoot = objectMapper.readTree(response.getBody());
            String kakaoErrorMessage = errorRoot.get("message").asText();
            throw new ExternalApiException(kakaoErrorMessage, PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
