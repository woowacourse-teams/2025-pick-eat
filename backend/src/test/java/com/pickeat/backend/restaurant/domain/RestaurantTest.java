package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.RestaurantFixture;
import org.junit.jupiter.api.Test;

class RestaurantTest {

    @Test
    void 식당_소거_성공() {
        // given
        Restaurant restaurant = RestaurantFixture.create();

        // when
        restaurant.exclude();

        // then
        assertThat(restaurant.getIsExcluded()).isTrue();
    }

}
