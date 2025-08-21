package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RestaurantsTest {

    @Nested
    class 랜덤_최고_선호도_식당_단건_조회_케이스 {

        @Test
        void 최고_선호도_식당이_단_한개일_경우_해당_식당_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);
            restaurant.like();
            Restaurants restaurants = new Restaurants(List.of(restaurant));

            // when
            Restaurant topRestaurant = restaurants.getRandomTopRatedRestaurant();

            // then
            assertThat(topRestaurant.getName()).isEqualTo(restaurant.getName());
        }

        @Test
        void 동점인_최고_선호도_식당들_중_하나를_랜덤_선택() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat, "백반집");
            restaurant1.like();
            Restaurant restaurant2 = RestaurantFixture.create(pickeat, "치킨집");
            restaurant2.like();

            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            Restaurant topRestaurant = restaurants.getRandomTopRatedRestaurant();

            // then
            assertThat(topRestaurant.getName()).isIn(restaurant1.getName(), restaurant2.getName());
        }


        @Test
        void 빈_식당_리스트일_경우_예외_발생() {
            // given
            Restaurants restaurants = new Restaurants(List.of());

            // when & then
            assertThatThrownBy(() -> restaurants.getRandomTopRatedRestaurant())
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.RESTAURANTS_IS_EMPTY.getMessage());
        }

        @Test
        void 모든_식당이_0점일_때_전체에서_랜덤_선택() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat, "백반집");
            Restaurant restaurant2 = RestaurantFixture.create(pickeat, "치킨집");
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            Restaurant topRestaurant = restaurants.getRandomTopRatedRestaurant();

            // then
            assertThat(topRestaurant.getName()).isIn(restaurant1.getName(), restaurant2.getName());
        }

        @Test
        void 다양한_선호도_중_최고점만_선택() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat, "1점집");
            restaurant1.like();
            Restaurant restaurant2 = RestaurantFixture.create(pickeat, "2점집");
            restaurant2.like();
            restaurant2.like();
            Restaurant restaurant3 = RestaurantFixture.create(pickeat, "3점집");
            restaurant3.like();
            restaurant3.like();
            restaurant3.like();

            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2, restaurant3));

            // when
            Restaurant topRestaurant = restaurants.getRandomTopRatedRestaurant();

            // then
            assertThat(topRestaurant.getName()).isEqualTo("3점집");
        }
    }

    @Nested
    class 동점_여부_조회_케이스 {

        @Test
        void 최고_선호도_식당이_1개면_동점_아님() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            restaurant1.like();
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            boolean hasEqualLike = restaurants.hasEqualLike();

            // then
            assertThat(hasEqualLike).isFalse();
        }

        @Test
        void 최고_선호도_식당이_여러개면_동점() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            restaurant1.like();
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            restaurant2.like();
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            boolean hasEqualLike = restaurants.hasEqualLike();

            // then
            assertThat(hasEqualLike).isTrue();
        }

        @Test
        void 모든_식당이_0점이면_동점() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            boolean hasEqualLike = restaurants.hasEqualLike();

            // then
            assertThat(hasEqualLike).isTrue();
        }

        @Test
        void 빈_리스트면_동점_아님() {
            // given
            Restaurants restaurants = new Restaurants(List.of());

            // when
            boolean hasEqualLike = restaurants.hasEqualLike();

            // then
            assertThat(hasEqualLike).isFalse();
        }
    }
}
