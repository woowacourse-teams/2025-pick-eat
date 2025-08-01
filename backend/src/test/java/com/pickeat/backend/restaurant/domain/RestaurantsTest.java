package com.pickeat.backend.restaurant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RestaurantsTest {

    @Nested
    class 최고_선호도_식당_조회_케이스 {

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
            Pickeat pickeat = PickeatFixture.create();
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
            Pickeat pickeat = PickeatFixture.create();
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
            Pickeat pickeat = PickeatFixture.create();
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
