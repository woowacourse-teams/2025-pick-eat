package com.pickeat.backend.wish.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Room;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class WishTest {

    @Nested
    class 위시_이름_수정_케이스 {

        @Test
        void 위시_이름_수정_성공() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.updateName("업데이트 위시");

            // then
            assertThat(wish.getName()).isEqualTo("업데이트 위시");
        }
    }

    @Nested
    class 위시_카테고리_수정_케이스 {

        @Test
        void 위시_카테고리_수정_성공() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.updateFoodCategory(FoodCategory.KOREAN);

            // then
            assertThat(wish.getFoodCategory()).isEqualTo(FoodCategory.KOREAN);
        }
    }

    @Nested
    class 위시_주소_수정_케이스 {

        @Test
        void 위시_주소_수정_성공() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.updateRoadAddressName("업데이트 주소");

            // then
            assertThat(wish.getRoadAddressName()).isEqualTo("업데이트 주소");
        }
    }

    @Nested
    class 위시_태그_수정_케이스 {

        @Test
        void 위시_태그_수정_성공() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.updateTags("업데이트 태그1,업데이트 태그2");

            // then
            assertThat(wish.getTags()).isEqualTo("업데이트 태그1,업데이트 태그2");
        }
    }
}
