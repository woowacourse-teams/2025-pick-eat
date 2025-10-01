package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantType;

public class RestaurantFixture {

    /**
     * Create a test Restaurant associated with the given Pickeat.
     *
     * <p>The created Restaurant uses fixed test values for its fields (name "식당",
     * category FoodCategory.KOREAN, capacity 10, address "도로명 주소", url "URL",
     * tags "태그1,태그2"), no location (null), and RestaurantType.LOCATION.
     *
     * @param pickeat the Pickeat to associate with the created Restaurant
     * @return a Restaurant initialized with the described test values and the provided pickeat
     */
    public static Restaurant create(Pickeat pickeat) {
        return new Restaurant(
                "식당",
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                null,
                RestaurantType.LOCATION,
                pickeat
        );
    }

    /**
     * Create a Restaurant test fixture using the given name and associated Pickeat.
     *
     * @param pickeat the Pickeat to associate with the created Restaurant
     * @param name    the restaurant's name
     * @return a Restaurant with the given name and pickeat; preset fields are:
     *         FoodCategory.KOREAN, capacity 10, address "도로명 주소", url "URL",
     *         tags "태그1,태그2", a null location, and RestaurantType.LOCATION
     */
    public static Restaurant create(Pickeat pickeat, String name) {
        return new Restaurant(
                name,
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                null,
                RestaurantType.LOCATION,
                pickeat
        );
    }
}
