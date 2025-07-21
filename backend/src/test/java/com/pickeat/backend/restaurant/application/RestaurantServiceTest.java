package com.pickeat.backend.restaurant.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.room.domain.Room;
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
    class 식당_소거_케이스 {

        @Test
        void 식당_소거_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(room)),
                    entityManager.persist(RestaurantFixture.create(room)),
                    entityManager.persist(RestaurantFixture.create(room)));
            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds));

            // then
            List<Restaurant> actualRestaurants = restaurantRepository.findAll();
            assertThat(actualRestaurants)
                    .extracting(Restaurant::getIsExcluded)
                    .containsOnly(true);
        }

        @Test
        void 조회된_식당의_방이_서로_다를_경우_예외() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Room otherRoom = entityManager.persist(RoomFixture.create());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(room)),
                    entityManager.persist(RestaurantFixture.create(otherRoom)));
            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds)))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.FORBIDDEN_ROOM.getMessage());
        }

        @Test
        void 비활성화된_방의_식당을_소거하려고_할_경우_예외() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(room)),
                    entityManager.persist(RestaurantFixture.create(room)));
            room.deactivate();

            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds)))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_ALREADY_INACTIVE.getMessage());
        }
    }

    @Nested
    class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(room));
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
    class 식당_선호_취소_케이스 {

        @Test
        void 식당_선호_취소_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(room));
            restaurant.like();
            Integer originCount = restaurant.getLikeCount();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.cancelLike(restaurant.getId());

            // then
            Restaurant actual = restaurantRepository.findById(restaurant.getId()).get();
            assertThat(actual.getLikeCount()).isEqualTo(originCount - 1);
        }

        @Test
        void 식당_선호수가_0이하일_경우_예외() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(room));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.cancelLike(restaurant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.LIKE_ALREADY_CANCELED.getMessage());
        }
    }
}
