package com.pickeat.backend.tobe.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.tobe.fixture.WishFixture;
import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.repository.WishRepository;
import com.pickeat.backend.user.domain.User;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {WishService.class})
class WishServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private WishService wishService;

    @Nested
    class 위시_생성_케이스 {

        @Test
        void 위시_생성_성공() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            WishRequest wishRequest = new WishRequest(
                    "위시1",
                    "일식",
                    "도로명주소1",
                    List.of("태그1", "태그2"),
                    "https://place.map.kakao.com/505348601"
            );

            entityManager.flush();
            entityManager.clear();

            // when
            WishResponse response = wishService.createWish(room.getId(), wishRequest, user.getId());

            // then
            assertThat(entityManager.find(Wish.class, response.id())).isNotNull();
        }

        @Test
        void 방의_참가하지_않은_회원이_요청할_경우_예외발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            WishRequest wishRequest = new WishRequest(
                    "위시1",
                    "일식",
                    "도로명주소1",
                    List.of("태그1", "태그2"),
                    "https://place.map.kakao.com/505348601"
            );

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.createWish(room.getId(), wishRequest, otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시_삭제_케이스 {

        @Test
        void 위시_삭제_성공() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            Wish wish = entityManager.persist(WishFixture.create(room));

            entityManager.flush();
            entityManager.clear();

            // when
            wishService.deleteWish(wish.getId(), user.getId());

            // then
            assertThat(wishRepository.findAll()).isEmpty();
        }

        @Test
        void 방의_참가하지_않은_회원이_요청할_경우_예외발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            Wish wish = entityManager.persist(WishFixture.create(room));

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.deleteWish(wish.getId(), otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시_수정_케이스 {

        @Test
        void 위시_수정_성공() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));
            Wish wish = entityManager.persist(WishFixture.create(room));

            entityManager.flush();
            entityManager.clear();

            WishUpdateRequest wishUpdateRequest = new WishUpdateRequest(
                    "업데이트 위시",
                    "한식",
                    "업데이트 주소",
                    List.of("업데이트 태그1", "업데이트 태그2"),
                    "업데이트 URL"
            );

            // when
            WishResponse response = wishService.updateWish(wish.getId(), user.getId(), wishUpdateRequest);

            // then
            Wish updatedWish = entityManager.find(Wish.class, response.id());
            RestaurantInfo updatedRestaurantInfo = updatedWish.getRestaurantInfo();
            assertAll(
                    () -> assertThat(updatedRestaurantInfo.getName()).isEqualTo("업데이트 위시"),
                    () -> assertThat(updatedRestaurantInfo.getFoodCategory()).isEqualTo(FoodCategory.KOREAN),
                    () -> assertThat(updatedRestaurantInfo.getRoadAddressName()).isEqualTo("업데이트 주소"),
                    () -> assertThat(updatedRestaurantInfo.getTags()).isEqualTo("업데이트 태그1,업데이트 태그2"),
                    () -> assertThat(updatedRestaurantInfo.getPlaceUrl()).isEqualTo("업데이트 URL")
            );
        }

        @Test
        void 방의_참가하지_않은_회원이_요청할_경우_예외발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));
            Wish wish = entityManager.persist(WishFixture.create(room));

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            WishUpdateRequest wishUpdateRequest = new WishUpdateRequest(
                    "업데이트 위시",
                    "한식",
                    "업데이트 주소",
                    List.of("업데이트 태그1", "업데이트 태그2"),
                    "https://place.map.kakao.com/505348601"
            );

            // when & then
            assertThatThrownBy(() -> wishService.updateWish(wish.getId(), otherUser.getId(), wishUpdateRequest))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시리스트의_위시_조회_케이스 {

        @Test
        void 위시리스트의_위시_조회_성공() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> response = wishService.getWishes(room.getId(), user.getId());

            // then
            List<Long> actualWishIds = wishes.stream().map(Wish::getId).toList();
            assertThat(response)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(actualWishIds);
        }

        @Test
        void 조회된_위시들은_기본적으로_생성순으로_정렬() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            entityManager.persist(new RoomUser(room.getId(), user.getId()));

            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> response = wishService.getWishes(room.getId(), user.getId());

            // then
            List<Long> sortedWishIds = wishes.stream()
                    .sorted(Comparator.comparing(Wish::getCreatedAt).reversed())
                    .map(Wish::getId).toList();
            assertThat(response)
                    .extracting(WishResponse::id)
                    .containsExactlyElementsOf(sortedWishIds);
        }

        @Test
        void 방에_참가한_회원이_아닌_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)),
                    entityManager.persist(WishFixture.create(room)));

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.getWishes(room.getId(), otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }
    }
}
