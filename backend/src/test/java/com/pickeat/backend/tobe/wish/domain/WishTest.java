package com.pickeat.backend.tobe.wish.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class WishTest {

    @Nested
    class 위시_생성_케이스 {

        @Test
        void 위시_생성시_태그가_존재하지_않으면_태그필드는_null로_삽입() {
            // given
            Room room = RoomFixture.create();
            com.pickeat.backend.wish.domain.WishList wishList = WishListFixture.createPrivate(room.getId());

            // when
            com.pickeat.backend.wish.domain.Wish wish = new com.pickeat.backend.wish.domain.Wish(
                    "위시",
                    FoodCategory.KOREAN,
                    "도로명주소",
                    "",
                    "https://place.map.kakao.com/505348601",
                    wishList);

            // then
            assertThat(wish.getTags()).isNull();
        }
    }

    @Nested
    class 위시_이름_수정_케이스 {

        @Test
        void 위시_이름_수정_성공() {
            // given
            Room room = RoomFixture.create();
            com.pickeat.backend.wish.domain.WishList wishList = WishListFixture.createPrivate(room.getId());
            com.pickeat.backend.wish.domain.Wish wish = WishFixture.create(wishList);

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
            com.pickeat.backend.wish.domain.WishList wishList = WishListFixture.createPrivate(room.getId());
            com.pickeat.backend.wish.domain.Wish wish = WishFixture.create(wishList);

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
            com.pickeat.backend.wish.domain.WishList wishList = WishListFixture.createPrivate(room.getId());
            com.pickeat.backend.wish.domain.Wish wish = WishFixture.create(wishList);

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
            com.pickeat.backend.wish.domain.WishList wishList = WishListFixture.createPrivate(room.getId());
            com.pickeat.backend.wish.domain.Wish wish = WishFixture.create(wishList);

            // when
            wish.updateTags("업데이트 태그1,업데이트 태그2");

            // then
            assertThat(wish.getTags()).isEqualTo("업데이트 태그1,업데이트 태그2");
        }

        @Test
        void 위시_태그_수정시_빈_태그가_삽입되면_null로_수정() {
            // given
            Room room = RoomFixture.create();
            WishList wishList = WishListFixture.createPrivate(room.getId());
            Wish wish = WishFixture.create(wishList);

            // when
            wish.updateTags("");

            // then
            assertThat(wish.getTags()).isNull();
        }
    }
}
