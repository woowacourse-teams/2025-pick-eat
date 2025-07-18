package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;

public class RestaurantFixture {

    public static Restaurant create() {
        return new Restaurant("식당", FoodCategory.KOREAN, 10, "도로명 주소", "URL");
    }

}
