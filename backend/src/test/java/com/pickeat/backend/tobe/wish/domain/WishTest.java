package com.pickeat.backend.tobe.wish.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.tobe.fixture.RestaurantInfoFixture;
import com.pickeat.backend.tobe.fixture.WishFixture;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class WishTest {

    @Nested
    class 위시의_식당정보_수정_케이스 {

        @Test
        void 위시의_식당정보_수정_케이스() {
            // given
            Room room = RoomFixture.create();
            RestaurantInfo originRestaurantInfo = RestaurantInfoFixture.create("test_restaurant");
            Wish wish = WishFixture.create(room, originRestaurantInfo);

            RestaurantInfo newRestaurantInfo = RestaurantInfoFixture.create("test_new_restaurant");

            // when
            wish.updateRestaurantInfo(newRestaurantInfo);

            // then
            RestaurantInfo updatedRestaurantInfo = wish.getRestaurantInfo();
            assertAll(
                    () -> assertThat(updatedRestaurantInfo).isEqualTo(newRestaurantInfo),
                    () -> assertThat(updatedRestaurantInfo.getName()).isEqualTo(newRestaurantInfo.getName())
            );
        }
    }
}
