package com.pickeat.backend.wish.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Room;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class WishTest {

    @Nested
    class 위시_정보_수정_케이스 {

        @Test
        void 위시_정보_수정_성공() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.update(
                    "업데이트 위시",
                    FoodCategory.KOREAN,
                    "업데이트 주소",
                    "업데이트 태그1,업데이트 태그2");

            // then
            assertAll(
                    () -> assertThat(wish.getName()).isEqualTo("업데이트 위시"),
                    () -> assertThat(wish.getFoodCategory()).isEqualTo(FoodCategory.KOREAN),
                    () -> assertThat(wish.getRoadAddressName()).isEqualTo("업데이트 주소"),
                    () -> assertThat(wish.getTags()).isEqualTo("업데이트 태그1,업데이트 태그2")
            );
        }
    }
}
