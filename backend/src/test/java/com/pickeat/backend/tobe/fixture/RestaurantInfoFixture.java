package com.pickeat.backend.tobe.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;

public class RestaurantInfoFixture {

    public static RestaurantInfo create(String name) {
        Picture picture = new Picture("test_picture_key", "test_picture_url");
        return new RestaurantInfo(
                name,
                FoodCategory.KOREAN,
                0,
                "test_raodAddressname",
                "test_placeUrl",
                "tag1,tag2",
                picture
        );
    }

    public static RestaurantInfo create(String name, Picture picture) {
        return new RestaurantInfo(
                name,
                FoodCategory.KOREAN,
                0,
                "test_raodAddressname",
                "test_placeUrl",
                "tag1,tag2",
                picture
        );
    }
}
