package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.RestaurantFixture;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RestaurantTest {

    @Nested
    class 식당_소거_케이스 {

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

    @Nested
    class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Restaurant restaurant = RestaurantFixture.create();
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
            Restaurant restaurant = RestaurantFixture.create();
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
            Restaurant restaurant = RestaurantFixture.create();

            // when & then
            assertThatThrownBy(restaurant::cancelLike)
                    .isInstanceOf(IllegalArgumentException.class);
        }
    }
}
