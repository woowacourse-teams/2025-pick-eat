package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

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
    class 이름을_기준으로_최고_선호도_식당_단건_조회_케이스 {

        @Test
        void 최고_선호도_식당이_단_한개일_경우_해당_식당_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant = RestaurantFixture.create(pickeat);
            restaurant.like();
            Restaurants restaurants = new Restaurants(List.of(restaurant));

            // when
            Restaurant topRestaurant = restaurants.getTopRestaurantByName();

            // then
            assertThat(topRestaurant.getName()).isEqualTo(restaurant.getName());
        }

        @Test
        void 최고_선호도_식당이_여러_개일_경우_이름순으로_정렬해서_한개의_식당_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat, "백반집");
            restaurant1.like();
            Restaurant restaurant2 = RestaurantFixture.create(pickeat, "치킨집");
            restaurant1.like();

            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            Restaurant topRestaurant = restaurants.getTopRestaurantByName();

            // then
            assertThat(topRestaurant.getName()).isEqualTo(restaurant1.getName());
        }

        @Test
        void 최고_선호도_식당이_존재하지_않을_경우_예외_발생() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurants restaurants = new Restaurants(List.of());

            // when & then
            assertThatThrownBy(() -> restaurants.getTopRestaurantByName())
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_RESULT_NOT_FOUND.getMessage());
        }
    }

    @Nested
    class 최고_선호도_식당_복수_조회_케이스 {

        @Test
        void 빈_식당_리스트일_때_빈_리스트_반환() {
            // given
            Restaurants restaurants = new Restaurants(List.of());

            // when
            List<Restaurant> topRestaurants = restaurants.getTopRestaurants();

            // then
            assertThat(topRestaurants).isEmpty();
        }

        @Test
        void 모든_식당의_선호도가_0일_때_빈_리스트_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            List<Restaurant> topRestaurants = restaurants.getTopRestaurants();

            // then
            assertThat(topRestaurants).isEmpty();
        }

        @Test
        void 최고_선호도_식당_1개일_때_해당_식당_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            restaurant1.like();
            restaurant1.like();
            restaurant2.like();
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2));

            // when
            List<Restaurant> topRestaurants = restaurants.getTopRestaurants();

            // then
            assertAll(
                    () -> assertThat(topRestaurants).hasSize(1),
                    () -> assertThat(topRestaurants.get(0)).isEqualTo(restaurant1)
            );
        }

        @Test
        void 최고_선호도_식당_여러개일_때_모든_해당_식당_반환() {
            // given
            Pickeat pickeat = PickeatFixture.createWithoutRoom();
            Restaurant restaurant1 = RestaurantFixture.create(pickeat);
            Restaurant restaurant2 = RestaurantFixture.create(pickeat);
            Restaurant restaurant3 = RestaurantFixture.create(pickeat);
            restaurant1.like();
            restaurant1.like();
            restaurant2.like();
            restaurant2.like();
            restaurant3.like();
            Restaurants restaurants = new Restaurants(List.of(restaurant1, restaurant2, restaurant3));

            // when
            List<Restaurant> topRestaurants = restaurants.getTopRestaurants();

            // then
            assertAll(
                    () -> assertThat(topRestaurants).hasSize(2),
                    () -> assertThat(topRestaurants).containsExactlyInAnyOrder(restaurant1, restaurant2)
            );
        }
    }
}
