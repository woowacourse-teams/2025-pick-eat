package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantSearchService {
    private final RestaurantSearchClient restaurantSearchClient;

    //TODO: 분명 개선 여지가 있을텐데... + 테스트 (2025-07-21, 월, 20:32)
    public List<RestaurantRequest> search(Double x, Double y, Integer radius) {
        List<RestaurantRequest> requests = new ArrayList<>();
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("한식", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("양식", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("중식", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("일식", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("패스트푸드", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("아시안음식", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("도시락", x, y, radius, 15)));
        requests.addAll(restaurantSearchClient.getRestaurants(new RestaurantSearchRequest("분식", x, y, radius, 15)));

        return requests;
    }
}
