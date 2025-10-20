package com.pickeat.backend.restaurant.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.ParticipantPrincipalFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.infrastructure.PickeatRepositoryImpl;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.restaurant.infrastructure.RestaurantJdbcRepository;
import com.pickeat.backend.restaurant.infrastructure.RestaurantLikeRepositoryImpl;
import com.pickeat.backend.restaurant.infrastructure.RestaurantRepositoryImpl;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {RestaurantService.class, RestaurantJdbcRepository.class, RestaurantRepositoryImpl.class,
        RestaurantLikeRepositoryImpl.class, PickeatRepositoryImpl.class})
class RestaurantServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private RestaurantLikeRepository restaurantLikeRepository;

    @Nested
    class 식당_생성_케이스 {

        @Test
        void 식당_생성_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            List<RestaurantRequest> restaurantRequests = List.of(createRestaurantRequest(), createRestaurantRequest());

            // when
            restaurantService.create(restaurantRequests, pickeat.getCode().toString());

            // then
            List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
            assertThat(restaurants).hasSize(2);
        }

        private RestaurantRequest createRestaurantRequest() {
            return new RestaurantRequest("테스트이름", FoodCategory.CHINESE, 300, "테스트도로명주소",
                    "테스트url", "테스트태그", null, null, RestaurantType.LOCATION);
        }
    }

    @Nested
    class 식당_소거_케이스 {

        @Test
        void 식당_소거_성공() {
            // given

            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            ParticipantPrincipal participantPrincipal = ParticipantPrincipalFixture.create(participant, pickeat);

            List<Restaurant> restaurants = List.of(entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)));
            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds), participantPrincipal);

            // then
            List<Restaurant> actualRestaurants = restaurantRepository.findByPickeatId(pickeat.getId());
            assertThat(actualRestaurants).extracting(Restaurant::getIsExcluded).containsOnly(true);
        }

        @Test
        void 비활성화된_픽잇의_식당을_소거하려고_할_경우_예외() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            ParticipantPrincipal participantPrincipal = ParticipantPrincipalFixture.create(participant, pickeat);
            List<Restaurant> restaurants = List.of(entityManager.persist(RestaurantFixture.create(pickeat)),
                    entityManager.persist(RestaurantFixture.create(pickeat)));
            pickeat.deactivate();

            List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds), participantPrincipal))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_ALREADY_INACTIVE.getMessage());
        }
    }

    @Nested
    class 식당_선호_선택_케이스 {

        @Test
        void 식당_선호_선택_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));
            Integer originCount = restaurantLikeRepository.countAllByRestaurantId(restaurant.getId());

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.like(restaurant.getId(), participant.getId());

            // then
            Integer actualCount = restaurantLikeRepository.countAllByRestaurantId(restaurant.getId());
            assertThat(actualCount).isEqualTo(originCount + 1);
        }

        @Test
        void 이미_선호한_식당을_다시_선호할때_예외() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));
            entityManager.flush();
            entityManager.clear();

            restaurantService.like(restaurant.getId(), participant.getId());

            // when & then
            assertThatThrownBy(() -> restaurantService.like(restaurant.getId(), participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PARTICIPANT_RESTAURANT_ALREADY_LIKED.getMessage());
        }
    }

    @Nested
    class 식당_선호_취소_케이스 {

        @Test
        void 식당_선호_취소_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            Restaurant restaurant = entityManager.persist(RestaurantFixture.create(pickeat));
            entityManager.persist(new RestaurantLike(participant.getId(), restaurant.getId()));
            Integer originCount = restaurantLikeRepository.countAllByRestaurantId(restaurant.getId());

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.cancelLike(restaurant.getId(), participant.getId());

            // then
            Integer actualCount = restaurantLikeRepository.countAllByRestaurantId(restaurant.getId());
            assertThat(actualCount).isEqualTo(originCount - 1);

        }
    }

    @Nested
    class 식당_조회_케이스 {

        @Test
        void 식당_조회_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            Restaurant restaurant1 = entityManager.persist(RestaurantFixture.create(pickeat));
            Restaurant restaurant2 = entityManager.persist(RestaurantFixture.create(pickeat));

            entityManager.flush();
            entityManager.clear();

            // when
            List<RestaurantResponse> restaurants = restaurantService.getPickeatRestaurants(
                    pickeat.getCode().toString(), false, participant.getId());

            // then
            assertThat(restaurants).hasSize(2);
        }

        @Test
        void 참여자의_식당_좋아요_여부_조회_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat.getId()));
            Restaurant restaurant1 = entityManager.persist(RestaurantFixture.create(pickeat));
            Restaurant restaurant2 = entityManager.persist(RestaurantFixture.create(pickeat));

            entityManager.flush();
            entityManager.clear();

            // when
            restaurantService.like(restaurant1.getId(), participant.getId());
            List<RestaurantResponse> restaurants = restaurantService.getPickeatRestaurants(
                    pickeat.getCode().toString(), false, participant.getId());

            // then
            assertThat(restaurants.getFirst().isLiked()).isTrue();
            assertThat(restaurants.getLast().isLiked()).isFalse();
        }
    }
}
