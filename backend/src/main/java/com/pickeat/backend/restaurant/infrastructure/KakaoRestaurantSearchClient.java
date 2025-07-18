package com.pickeat.backend.restaurant.infrastructure;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

//TODO: size 따라서 api 요청 여러번 보내는 로직 구현하기  (2025-07-18, 금, 14:52)
@RequiredArgsConstructor
public class KakaoRestaurantSearchClient implements RestaurantSearchClient {
    public static final String URI = "v2/local/search/keyword.json";
    private static final String CATEGORY_GROUP_CODE = "FD6"; // 카카오에서 식당을 나타내는 코드
    private static final String SORT = "accuracy"; // 정렬 기준 (distance: 거리, accuracy: 정확도)

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        try {
            return callApi(request);
        } catch (RestClientException e) {
            throw new RestClientException("외부 서버 오류"); //TODO: 커스텀 예외로 포장하기 (2025-07-17, 목, 16:23)
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

    //TODO: 커스텀 예외로 바꾸기  (2025-07-17, 목, 17:3)
    private void handleError(ClientHttpResponse response) {
        try {
            JsonNode errorRoot = objectMapper.readTree(response.getBody());
            String kakaoErrorMessage = errorRoot.get("message").asText();
            throw new IllegalArgumentException(kakaoErrorMessage);
        } catch (IOException e) {
            throw new IllegalArgumentException();
        }
    }

    private List<RestaurantRequest> parsingResponse(JsonNode root) {
        JsonNode documents = root.path("documents");
        List<RestaurantRequest> restaurantRequests = new ArrayList<>();
        for (JsonNode document : documents) {
            restaurantRequests.add(
                    new RestaurantRequest(
                            document.path("place_name").asText(),
                            parseCategory(document.path("category_name").asText()),
                            document.path("distance").asInt(),
                            document.path("road_address_name").asText(),
                            document.path("x").asDouble(),
                            document.path("y").asDouble(),
                            document.path("place_url").asText()
                    )
            );
        }
        return restaurantRequests;
    }

    private FoodCategory parseCategory(String categoryName) {
        return FoodCategory.getCategoryNameBy(categoryName);
    }
}
