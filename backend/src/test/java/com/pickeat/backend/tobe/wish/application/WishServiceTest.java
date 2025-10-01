package com.pickeat.backend.tobe.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {com.pickeat.backend.wish.application.WishService.class})
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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            WishRequest wishRequest = new WishRequest("위시1", "일식", "도로명주소1", List.of("태그1", "태그2"),
                    "https://place.map.kakao.com/505348601");

            entityManager.flush();
            entityManager.clear();

            // when
            WishResponse response = wishService.createWish(wishList.getId(), wishRequest, user.getId());

            // then
            assertThat(entityManager.find(Wish.class, response.id())).isNotNull();
        }

        @Test
        void 방의_참가하지_않은_회원이_요청할_경우_예외발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            WishRequest wishRequest = new WishRequest("위시1", "일식", "도로명주소1", List.of("태그1", "태그2"),
                    "https://place.map.kakao.com/505348601");

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.createWish(wishList.getId(), wishRequest, otherUser.getId()))
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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            Wish wish = entityManager.persist(WishFixture.create(wishList));

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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            Wish wish = entityManager.persist(WishFixture.create(wishList));

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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            Wish wish = entityManager.persist(WishFixture.create(wishList));

            entityManager.flush();
            entityManager.clear();

            WishUpdateRequest wishUpdateRequest = new WishUpdateRequest(
                    "업데이트 위시",
                    "한식",
                    "업데이트 주소",
                    List.of("업데이트 태그1", "업데이트 태그2")
                    , "https://place.map.kakao.com/505348601"
            );

            // when
            WishResponse response = wishService.updateWish(wish.getId(), user.getId(), wishUpdateRequest);

            // then
            Wish updatedWish = entityManager.find(Wish.class, response.id());
            assertAll(
                    () -> assertThat(updatedWish.getName()).isEqualTo("업데이트 위시"),
                    () -> assertThat(updatedWish.getFoodCategory()).isEqualTo(FoodCategory.KOREAN),
                    () -> assertThat(updatedWish.getRoadAddressName()).isEqualTo("업데이트 주소"),
                    () -> assertThat(updatedWish.getTags()).isEqualTo("업데이트 태그1,업데이트 태그2"),
                    () -> assertThat(updatedWish.getPlaceUrl()).isEqualTo("https://place.map.kakao.com/505348601")
            );
        }

        @Test
        void 방의_참가하지_않은_회원이_요청할_경우_예외발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            Wish wish = entityManager.persist(WishFixture.create(wishList));

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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> response = wishService.getWishes(wishList.getId(), user.getId());

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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> response = wishService.getWishes(wishList.getId(), user.getId());

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
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.getWishes(wishList.getId(), otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }

        @Test
        void 공용_위시는_검증없이_조회() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            WishList publicWishList = entityManager.persist(WishListFixture.createPublic(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(publicWishList)),
                    entityManager.persist(WishFixture.create(publicWishList)),
                    entityManager.persist(WishFixture.create(publicWishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> response = wishService.getWishes(publicWishList.getId(), user.getId());

            // then
            List<Long> actualWishIds = wishes.stream().map(Wish::getId).toList();
            assertThat(response)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(actualWishIds);
        }
    }

    @Nested
    class 공용_위시리스트의_위시_조회_케이스 {

        @Test
        void 위시리스트의_위시_조회_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            WishList wishList = entityManager.persist(WishListFixture.createPublic(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> responses = wishService.getWishesFromTemplates(wishList.getId());

            // then
            List<Long> wishIds = wishes.stream().map(Wish::getId).toList();
            assertThat(responses)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(wishIds);
        }

        @Test
        void 조회되는_위시는_기본적으로_생성순으로_정렬() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            WishList wishList = entityManager.persist(WishListFixture.createPublic(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> responses = wishService.getWishesFromTemplates(wishList.getId());

            // then
            List<Long> sortedWishIds = wishes.stream()
                    .sorted(Comparator.comparing(Wish::getCreatedAt).reversed())
                    .map(Wish::getId).toList();
            assertThat(responses)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(sortedWishIds);
        }

        @Test
        void 위시리스트가_존재하지_않는_경우_예외_발생() {
            // when & then
            assertThatThrownBy(() -> wishService.getWishesFromTemplates(1L))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_NOT_FOUND.getMessage());
        }

        @Test
        void 공용_위시리스트가_아닌_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            List<Wish> wishes = List.of(entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.getWishesFromTemplates(wishList.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_PUBLIC_WISH_LIST.getMessage());
        }
    }
}
