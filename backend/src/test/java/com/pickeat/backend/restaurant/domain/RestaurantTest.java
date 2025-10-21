package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RestaurantTest {

    @Nested
    class 식당_소거_케이스 {

        @Test
        void 식당_소거_성공() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);

            // when
            restaurant.exclude();

            // then
            assertThat(restaurant.getIsExcluded()).isTrue();
        }
    }
}
