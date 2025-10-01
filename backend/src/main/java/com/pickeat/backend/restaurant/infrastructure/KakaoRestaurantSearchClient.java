package com.pickeat.backend.restaurant.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

//TODO: size 따라서 api 요청 여러번 보내는 로직 구현하기  (2025-07-18, 금, 14:52)
@RequiredArgsConstructor
public class KakaoRestaurantSearchClient implements RestaurantSearchClient {

    private static final String URI = "v2/local/search/keyword.json";
    private static final String CATEGORY_GROUP_CODE = "FD6"; // 카카오에서 식당을 나타내는 코드
    private static final String SORT = "accuracy"; // 정렬 기준 (distance: 거리, accuracy: 정확도)
    private static final String PLATFORM_NAME = "kakao";

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        try {
            return callApi(request);
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), PLATFORM_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<RestaurantRequest> callApi(RestaurantSearchRequest searchRequest) {
        JsonNode root = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(URI)
                        .queryParam("query", searchRequest.query())
                        .queryParam("category_group_code", CATEGORY_GROUP_CODE)
                        .queryParam("x", searchRequest.x())
                        .queryParam("y", searchRequest.y())
                        .queryParam("radius", searchRequest.radius())
                        .queryParam("size", searchRequest.size())
                        .queryParam("sort", SORT)
                        .build())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, response) -> handleError(response))
                .body(JsonNode.class);
        return parsingResponse(root);
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

    /**
     * Converts the Kakao Places API JSON root into a list of RestaurantRequest objects.
     *
     * @param root the JSON root node returned by the Kakao API; must contain a "documents" array of place entries
     * @return a list of RestaurantRequest built from each entry in the "documents" array
     */
    private List<RestaurantRequest> parsingResponse(JsonNode root) {
        JsonNode documents = root.path("documents");
        List<RestaurantRequest> restaurantRequests = new ArrayList<>();
        for (JsonNode document : documents) {
            restaurantRequests.add(
                    RestaurantRequest.fromLocation(
                            document.path("place_name").asText(),
                            parseCategory(document.path("category_name").asText()),
                            document.path("distance").asInt(),
                            document.path("road_address_name").asText(),
                            document.path("place_url").asText(),
                            extractTags(document.path("category_name").asText())
                    )
            );
        }
        return restaurantRequests;
    }

    private FoodCategory parseCategory(String categoryName) {
        return FoodCategory.getCategoryNameBy(categoryName);
    }

    private String extractTags(String categoryFullPath) {
        String[] parts = categoryFullPath.split(" > ");
        List<String> tags = new ArrayList<>();

        for (String part : parts) {
            if ("음식점".equals(part)) {
                continue; // 최상위 카테고리 제거
            }
            if (isFoodCategory(part)) {
                continue; // KOREAN, JAPANESE 등은 제외
            }
            tags.add(part);
        }

        return String.join(",", tags); // 쉼표로 join
    }

    private boolean isFoodCategory(String categoryPart) {
        return Arrays.stream(FoodCategory.values())
                .anyMatch(fc -> categoryPart.contains(fc.getName()));
    }
}
