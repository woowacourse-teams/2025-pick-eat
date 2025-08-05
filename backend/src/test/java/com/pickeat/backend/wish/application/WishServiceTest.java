package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishRepository;
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
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            WishRequest wishRequest = new WishRequest("위시1", "일식", "도로명주소1", List.of("태그1", "태그2"));

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
            WishRequest wishRequest = new WishRequest("위시1", "일식", "도로명주소1", List.of("태그1", "태그2"));

            User otherUser = entityManager.persist(UserFixture.create());

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

            // when & then
            assertThatThrownBy(() -> wishService.deleteWish(wish.getId(), otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시리스트의_위시_조회_케이스 {

        @Test
        void 위시리스트의_위시_조회_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithRoom(room.getId()));
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat));

            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            List<Wish> wishes = List.of(
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)),
                    entityManager.persist(WishFixture.create(wishList)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishResponse> expectedResponse = wishService.getWishes(wishList.getId(), participant.getId());

            // then
            List<Long> actualWishIds = wishes.stream().map(Wish::getId).toList();
            assertThat(expectedResponse)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(actualWishIds);
        }

        @Test
        void 방의_참가자가_아닌_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithRoom(room.getId()));
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat));

            Room otherRoom = entityManager.persist(RoomFixture.create());
            WishList otherRoomWishList = entityManager.persist(WishListFixture.createPrivate(otherRoom.getId()));
            List<Wish> otherRoomWishes = List.of(
                    entityManager.persist(WishFixture.create(otherRoomWishList)),
                    entityManager.persist(WishFixture.create(otherRoomWishList)),
                    entityManager.persist(WishFixture.create(otherRoomWishList)));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishService.getWishes(otherRoomWishList.getId(), participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_ACCESS_DENIED.getMessage());
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
            List<WishResponse> responses = wishService.getWishesFromPublicWishList(wishList.getId());

            // then
            List<Long> wishIds = wishes.stream().map(Wish::getId).toList();
            assertThat(responses)
                    .extracting(WishResponse::id)
                    .containsExactlyInAnyOrderElementsOf(wishIds);
        }

        @Test
        void 위시리스트가_존재하지_않는_경우_예외_발생() {
            // when & then
            assertThatThrownBy(() -> wishService.getWishesFromPublicWishList(1L))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISHLIST_NOT_FOUND.getMessage());
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
            assertThatThrownBy(() -> wishService.getWishesFromPublicWishList(wishList.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_PUBLIC_WISH_LIST.getMessage());
        }
    }
}
