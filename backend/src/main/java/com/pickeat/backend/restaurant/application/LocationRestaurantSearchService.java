package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.RestaurantCategory;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationRestaurantSearchService {

    private static final int RESTAURANT_SEARCH_SIZE = 10;
    private final RestaurantSearchClient restaurantSearchClient;

    //TODO: 분명 개선 여지가 있을텐데... + 테스트 (2025-07-21, 월, 20:32)
    public List<RestaurantRequest> searchByLocation(LocationRestaurantRequest request) {
        Double x = request.x();
        Double y = request.y();
        int radius = request.radius();

        // TEMP: 임시 시간 측정 코드
        long start = System.currentTimeMillis();
        try {
            restaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest(RestaurantCategory.KOREAN, x, y, radius, RESTAURANT_SEARCH_SIZE));
        } finally {
            log.info("RestaurantSearchClient Total Time={}", System.currentTimeMillis() - start);
        }

        List<RestaurantRequest> requests = new ArrayList<>();
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.KOREAN, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.WESTERN, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.CHINESE, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.JAPANESE, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.ASIANFOOD, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.LUNCHBOX, x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest(RestaurantCategory.STREETFOOD, x, y, radius, RESTAURANT_SEARCH_SIZE)));

        return requests;
    }
}
