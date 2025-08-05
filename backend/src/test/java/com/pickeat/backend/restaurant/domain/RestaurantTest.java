package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
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

        @Test
        void 비활성화된_픽잇의_식당을_소거하려고_할_경우_예외() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);
            pickeat.deactivate();

            // when & then
            assertThatThrownBy(restaurant::exclude)
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_ALREADY_INACTIVE.getMessage());
        }
    }

    @Nested
    class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);
            Integer origin = restaurant.getLikeCount();

            // when
            restaurant.like();

            // then
            Integer actual = restaurant.getLikeCount();
            assertThat(actual).isEqualTo(origin + 1);
        }
    }

    @Nested
    class 식당_선호_취소_케이스 {

        @Test
        void 식당_선호_취소_성공() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);
            restaurant.like();
            Integer origin = restaurant.getLikeCount();

            // when
            restaurant.cancelLike();

            // then
            Integer actual = restaurant.getLikeCount();
            assertThat(actual).isEqualTo(origin - 1);
        }

        @Test
        void 선호수가_0이하일_경우_예외() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);

            // when & then
            assertThatThrownBy(restaurant::cancelLike)
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.LIKE_ALREADY_CANCELED.getMessage());
        }
    }
}
