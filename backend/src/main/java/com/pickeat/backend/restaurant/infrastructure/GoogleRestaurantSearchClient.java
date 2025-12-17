package com.pickeat.backend.restaurant.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.RestaurantCategory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;


@RequiredArgsConstructor
public class GoogleRestaurantSearchClient implements RestaurantSearchClient {

    private static final String URI = "v1/places:searchNearby";
    private static final String PLATFORM_NAME = "google";


    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Override
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        try {
            return callApi(request);
        } catch (ResourceAccessException e) {
            throw e;
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<RestaurantRequest> callApi(RestaurantSearchRequest searchRequest) {

        String body = """
                {
                  "includedTypes": ["%s"],
                  "maxResultCount": %d,
                  "locationRestriction": {
                    "circle": {
                      "center": { "latitude": %.6f, "longitude": %.6f },
                      "radius": %.1f
                    }
                  }
                }
                """.formatted(searchRequest.restaurantCategory().getEnglishName(), searchRequest.size(),
                searchRequest.y(), searchRequest.x(), (double) searchRequest.radius());

        JsonNode root = restClient.post().uri(uriBuilder -> uriBuilder.path(URI).build())
                .header("X-Goog-FieldMask", "places.displayName,places.googleMapsUri").header("Accept-Language", "ko")
                .body(body).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> handleError(response)).body(JsonNode.class);

        return parsingResponse(root, searchRequest.restaurantCategory());
    }

    private void handleError(ClientHttpResponse response) {
        try {
            JsonNode errorRoot = objectMapper.readTree(response.getBody());
            String googleErrorMessage = objectMapper.writeValueAsString(errorRoot);
            throw new ExternalApiException(googleErrorMessage, PLATFORM_NAME, response.getStatusCode().value());
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    private List<RestaurantRequest> parsingResponse(JsonNode root, RestaurantCategory restaurantCategory) {
        JsonNode places = root.path("places");
        if (!places.isArray()) {
            return List.of();
        }

        List<RestaurantRequest> restaurantRequests = new ArrayList<>(places.size());

        for (JsonNode place : places) {
            String name = place.path("displayName").path("text").asText(null);
            String mapsUri = place.path("googleMapsUri").asText(null);

            if (name == null || name.isBlank() || mapsUri == null || mapsUri.isBlank()) {
                continue;
            }

            restaurantRequests.add(RestaurantRequest.fromLocation(name, mapsUri, restaurantCategory.getKoreanName()));
        }

        return restaurantRequests;
    }
}
