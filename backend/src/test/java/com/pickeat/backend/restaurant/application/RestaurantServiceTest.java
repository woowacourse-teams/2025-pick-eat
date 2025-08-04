package com.pickeat.backend.restaurant.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.domain.FoodCategory;
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
    class 식당_생성_케이스 {

        @Test
        void 식당_생성_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            Long pickeatId = pickeat.getId();
            List<RestaurantRequest> restaurantRequests = List.of(createRestaurantRequest(), createRestaurantRequest());

            // when
            restaurantService.create(restaurantRequests, pickeatId);

            // then
            assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, false)).hasSize(2);
        }

        private RestaurantRequest createRestaurantRequest() {
            return new RestaurantRequest(
                    "테스트이름",
                    FoodCategory.CHINESE,
                    300,
                    "테스트도로명주소",
                    new Location(10.0, 10.0),
                    "테스트url",
                    "테스트태그"
            );
        }
    }

    @Nested
    class 식당_소거_케이스 {

        @Test
        void 식당_소거_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)));
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
        void 조회된_식당의_픽잇이_서로_다를_경우_예외() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            Pickeat otherPickeat = entityManager.persist(PickeatFixture.createExternal());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(otherPickeat)));
            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds)))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.FORBIDDEN_PICKEAT.getMessage());
        }

        @Test
        void 비활성화된_픽잇의_식당을_소거하려고_할_경우_예외() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            List<Restaurant> restaurants = List.of(
                    entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)));
            pickeat.deactivate();

            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds)))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_ALREADY_INACTIVE.getMessage());
        }
    }

    @Nested
    class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));
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
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));
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
            Pickeat pickeat = entityManager.persist(PickeatFixture.createExternal());
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> restaurantService.cancelLike(restaurant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.LIKE_ALREADY_CANCELED.getMessage());
        }
    }
}
