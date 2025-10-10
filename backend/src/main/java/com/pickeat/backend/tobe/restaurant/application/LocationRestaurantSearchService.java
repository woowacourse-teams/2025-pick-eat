package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component("LocationRestaurantSearchServiceV2")
public class LocationRestaurantSearchService {

    private static final int RESTAURANT_SEARCH_SIZE = 10;
    private final RestaurantSearchClient restaurantSearchClient;

    public LocationRestaurantSearchService(
            @Qualifier("RestaurantSearchClientV2") RestaurantSearchClient restaurantSearchClient
    ) {
        this.restaurantSearchClient = restaurantSearchClient;
    }

    //TODO: 분명 개선 여지가 있을텐데... + 테스트 (2025-07-21, 월, 20:32)
    public List<RestaurantRequest> searchByLocation(LocationRestaurantRequest request) {
        Double x = request.x();
        Double y = request.y();
        int radius = request.radius();

        List<RestaurantRequest> requests = new ArrayList<>();
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("한식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("양식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("중식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("일식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("패스트푸드", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("아시안음식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("도시락", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("분식", x, y, radius, RESTAURANT_SEARCH_SIZE)));

        return requests;
    }
}
