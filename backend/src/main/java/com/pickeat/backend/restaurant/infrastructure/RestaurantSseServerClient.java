package com.pickeat.backend.restaurant.infrastructure;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.SseServerClient;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;

@RequiredArgsConstructor
public class RestaurantSseServerClient implements SseServerClient {

    private final RestClient restClient;
    private static final String PLATFORM_NAME = "sse";

    @Override
    public void notifyRestaurantUpdated(String pickeatCode) {
        restClient.post()
                .uri("/internal/sse/pickeat/{pickeatCode}", pickeatCode)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> handleError(response))
                .toBodilessEntity();
    }

    private void handleError(ClientHttpResponse response) {
        try {
            HttpStatus status = HttpStatus.valueOf(response.getStatusCode().value());
            throw new ExternalApiException("sse-server-error", PLATFORM_NAME, status);
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
