package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.domain.WishList;
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
            WishListResponse expectedResponse = wishListService.createWishList(room.getId(), user.getId(), request);

            // then
            assertThat(entityManager.find(WishList.class, expectedResponse.id())).isNotNull();
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
    class 위시리스트_조회_케이스 {

        @Test
        void 위시리스트_조회_성공() {
            // given
            Room templateRoom = entityManager.persist(RoomFixture.create());
            Room room = entityManager.persist(RoomFixture.create());
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithRoom(room.getId()));
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat));

            List<WishList> wishLists = List.of(
                    entityManager.persist(WishListFixture.createPrivate(room.getId())),
                    entityManager.persist(WishListFixture.createPrivate(room.getId())),
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())),
                    entityManager.persist(WishListFixture.createPublic(templateRoom.getId())));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishListResponse> expectedResponse = wishListService.getWishLists(room.getId(), participant.getId());

            // then
            List<Long> actualWishListIds = wishLists.stream().map(WishList::getId).toList();
            assertThat(expectedResponse)
                    .extracting(WishListResponse::id)
                    .containsExactlyInAnyOrderElementsOf(actualWishListIds);
        }

        @Test
        void 방의_참가자가_아닌_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithRoom(room.getId()));
            Participant participant = entityManager.persist(ParticipantFixture.create(pickeat));

            Room otherRoom = entityManager.persist(RoomFixture.create());
            List<WishList> otherRoomWishLists = List.of(
                    entityManager.persist(WishListFixture.createPrivate(otherRoom.getId())),
                    entityManager.persist(WishListFixture.createPrivate(otherRoom.getId())));

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishListService.getWishLists(otherRoom.getId(), participant.getId()))
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
            List<WishListResponse> expectedResponse = wishListService.getPublicWishLists();

            // then
            List<Long> publicWishListIds = publicWishLists.stream().map(WishList::getId).toList();
            assertThat(expectedResponse)
                    .extracting(WishListResponse::id)
                    .containsExactlyInAnyOrderElementsOf(publicWishListIds);

        }
    }
}
