package com.pickeat.backend.fake.restaurant;

import com.pickeat.backend.restaurant.application.RestaurantSearchClient;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class FakeRestaurantSearchClient implements RestaurantSearchClient {

    /**
     * Generates a list of fake RestaurantRequest objects derived from the given search request.
     *
     * Each returned entry is populated with a name based on the request query and index, a category
     * resolved from the query, a radius value between 0 and request.radius() (inclusive),
     * and placeholder address, URL, and tags values.
     *
     * @param request the search request whose query, size, and radius determine the generated entries
     * @return a list of populated RestaurantRequest objects of length request.size()
     */
    @Override
    public List<RestaurantRequest> getRestaurants(RestaurantSearchRequest request) {
        List<RestaurantRequest> restaurants = new ArrayList<>();
        for (int i = 0; i < request.size(); i++) {
            restaurants.add(RestaurantRequest.fromLocation(
                    request.query() + "음식" + i,
                    FoodCategory.getCategoryNameBy(request.query()),
                    ThreadLocalRandom.current().nextInt(0, request.radius() + 1),
                    "도로명 주소" + i,
                    "식당 URL" + i,
                    "태그" + i
            ));
        }
        return restaurants;
    }
}
