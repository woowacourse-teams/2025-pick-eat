package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.fixture.WishPictureFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {WishListService.class})
class WishListServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private WishListService wishListService;

    @Nested
    class 위시리스트_생성_케이스 {

        @Test
        void 위시리스트_생성_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            User user = entityManager.persist(UserFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            WishListRequest request = new WishListRequest("위시리스트");

            // when
            WishListResponse response = wishListService.createWishList(room.getId(), user.getId(), request);

            // then
            assertThat(entityManager.find(WishList.class, response.id())).isNotNull();
        }

        @Test
        void 방에_참가중이_아닌_회원의_경우_예외_발생() {
            // given
            Room otherRoom = entityManager.persist(RoomFixture.create());
            User user = entityManager.persist(UserFixture.create());

            WishListRequest request = new WishListRequest("위시리스트");

            // when & then
            assertThatThrownBy(() -> wishListService.createWishList(otherRoom.getId(), user.getId(), request))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 방의_위시리스트_조회_케이스 {

        @Test
        void 방의_위시리스트_조회_성공() {
            // given
            Room templateRoom = entityManager.persist(RoomFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            User user = entityManager.persist(UserFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));

            List<WishList> privateWishList = List.of(
                    entityManager.persist(WishListFixture.createPrivate(room.getId())),
                    entityManager.persist(WishListFixture.createPrivate(room.getId())));
            List<WishList> publicWishLists = List.of(
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())),
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishListResponse> response = wishListService.getPrivateWishLists(room.getId(), user.getId());

            // then
            List<Long> privateWishListIds = privateWishList.stream().map(WishList::getId).toList();
            assertThat(response)
                    .extracting(WishListResponse::id)
                    .containsExactlyInAnyOrderElementsOf(privateWishListIds);
        }

        @Test
        void 방의_회원이_아닌_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            User user = entityManager.persist(UserFixture.create());

            Room otherRoom = entityManager.persist(RoomFixture.create());
            List<WishList> otherRoomWishLists = List.of(
                    entityManager.persist(WishListFixture.createPrivate(otherRoom.getId())),
                    entityManager.persist(WishListFixture.createPrivate(otherRoom.getId())));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishListService.getPrivateWishLists(otherRoom.getId(), user.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 공용_위시리스트_목록_조회_케이스 {

        @Test
        void 공용_위시리스트_목록_조회_성공() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            List<WishList> privateWishLists = List.of(
                    entityManager.persist(WishListFixture.createPrivate(room.getId())),
                    entityManager.persist(WishListFixture.createPrivate(room.getId())));

            Room templateRoom = entityManager.persist(RoomFixture.create());
            List<WishList> publicWishLists = List.of(
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())),
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishListResponse> response = wishListService.getPublicWishLists();

            // then
            List<Long> publicWishListIds = publicWishLists.stream().map(WishList::getId).toList();
            assertThat(response)
                    .extracting(WishListResponse::id)
                    .containsExactlyInAnyOrderElementsOf(publicWishListIds);
        }
    }

    @Nested
    class 위시리스트_삭제_케이스 {

        @Test
        void 위시리스트_삭제_성공() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));

            entityManager.flush();
            entityManager.clear();

            // when
            wishListService.deleteWishList(wishList.getId(), user.getId());

            // then
            assertThat(entityManager.find(WishList.class, wishList.getId())).isNull();
        }

        @Test
        void 방의_참가자가_아닌_회원이_위시리스트를_삭제할_경우_예외_발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishListService.deleteWishList(wishList.getId(), user.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_ACCESS_DENIED.getMessage());
        }

        @Test
        void 위시리스트가_존재하지_않는_경우_예외_발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Long invalidWishListId = 100L;

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishListService.deleteWishList(invalidWishListId, user.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_LIST_NOT_FOUND.getMessage());
        }

        @Test
        void 위시와_위시사진이_함께_삭제되는지_체크() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            RoomUser roomUser = entityManager.persist(new RoomUser(room, user));
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
            Wish wish = entityManager.persist(WishFixture.create(wishList));
            WishPicture wishPicture = entityManager.persist(WishPictureFixture.create(wish));

            entityManager.flush();
            entityManager.clear();

            // when
            wishListService.deleteWishList(wishList.getId(), user.getId());

            // then
            assertAll(
                    () -> assertThat(entityManager.find(WishList.class, wishList.getId())).isNull(),
                    () -> assertThat(entityManager.find(Wish.class, wish.getId())).isNull(),
                    () -> assertThat(entityManager.find(WishPicture.class, wishPicture.getId())).isNull()
            );
        }
    }
}
