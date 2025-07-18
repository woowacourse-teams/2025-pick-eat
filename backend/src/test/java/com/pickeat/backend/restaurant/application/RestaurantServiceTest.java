package com.pickeat.backend.restaurant.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {RestaurantService.class})
class RestaurantServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Nested
    public class 식당_소거_케이스 {

        @Test
        void 식당_소거_성공() {
            // given
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create()),
                    entityManager.persist(RestaurantFixture.create()),
                    entityManager.persist(RestaurantFixture.create()));
            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds));

            // then
            List<Restaurant> actualRestaurants = restaurantRepository.findAll();
            assertThat(actualRestaurants)
                    .extracting(Restaurant::getIsExcluded)
                    .containsExactly(true, true, true);
        }
    }

    @Nested
    public class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create());
            Integer originCount = restaurant.getLikeCount();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.like(restaurant.getId());

            // then
            Restaurant actual = restaurantRepository.findById(restaurant.getId()).get();
            assertThat(actual.getLikeCount()).isEqualTo(originCount + 1);
        }
    }

    @Nested
    public class 식당_선호_취소_케이스 {

        @Test
        void 식당_선호_취소_성공() {
            // given
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create());
            restaurant.like();
            Integer originCount = restaurant.getLikeCount();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.unlike(restaurant.getId());

            // then
            Restaurant actual = restaurantRepository.findById(restaurant.getId()).get();
            assertThat(actual.getLikeCount()).isEqualTo(originCount - 1);
        }

        @Test
        void 식당_선호수가_0이하일_경우_예외() {
            // given
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.unlike(restaurant.getId()))
                    .isInstanceOf(IllegalArgumentException.class);
        }
    }
}
