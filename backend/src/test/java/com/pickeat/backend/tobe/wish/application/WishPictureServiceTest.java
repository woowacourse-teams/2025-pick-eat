package com.pickeat.backend.tobe.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.tobe.fixture.WishFixture;
import com.pickeat.backend.tobe.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.tobe.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.repository.WishRepository;
import com.pickeat.backend.tobe.wish.infrastructure.LocalImageUploadClient;
import com.pickeat.backend.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.web.multipart.MultipartFile;

@DataJpaTest
class WishPictureServiceTest {

    private static final String DEFAULT_IMAGE_URL = "test_defaultUrl";
    private static final String DEFAULT_IMAGE_KEY_PREFIX = "keyPrefix";

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private RoomUserRepository roomUserRepository;

    private WishPictureService wishPictureService;

    @BeforeEach
    void setup() {
        ImageUploadClient imageUploadClient =
                new LocalImageUploadClient(DEFAULT_IMAGE_URL, DEFAULT_IMAGE_KEY_PREFIX);
        wishPictureService = setupWishPictureService(imageUploadClient);
    }

    @Nested
    class 위시_사진_생성_케이스 {

        @Test
        void 위시_사진_생성_성공() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom()));
            MultipartFile picture = makeMockImageFile();

            entityManager.flush();
            entityManager.clear();

            // when
            WishPictureResponse response = wishPictureService.createWishPicture(
                    wish.getId(),
                    roomUser.getUser().getId(),
                    picture
            );

            // then
            Wish updatedWish = entityManager.find(Wish.class, wish.getId());
            Picture updatedPicture = updatedWish.getRestaurantInfo().getPicture();
            assertAll(
                    () -> assertThat(response.wishId()).isEqualTo(wish.getId()),
                    () -> assertThat(response.imageDownloadUrl()).isEqualTo(DEFAULT_IMAGE_URL),
                    () -> assertThat(updatedPicture.getPictureKey()).startsWith(DEFAULT_IMAGE_KEY_PREFIX),
                    () -> assertThat(updatedPicture.getPictureUrl()).isEqualTo(DEFAULT_IMAGE_URL)
            );
        }

        @Test
        void 허용하지_않는_형식이_입력될_경우() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom()));

            MultipartFile mockFile = mock(MultipartFile.class);
            when(mockFile.getContentType()).thenReturn("image/gif");
            MultipartFile picture = mockFile;

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(wish.getId(), roomUser.getUser().getId(), picture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_ALLOWED_CONTENT_TYPE.getMessage());
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_생성할_경우_예외_발생() {
            // given
            User user = entityManager.persist(UserFixture.create());
            Room otherRoom = entityManager.persist(RoomFixture.create());
            Wish wishInOtherRoom = entityManager.persist(WishFixture.create(otherRoom));

            MultipartFile picture = makeMockImageFile();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(wishInOtherRoom.getId(), user.getId(), picture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_PICTURE_ACCESS_DENIED.getMessage());
        }

        @Test
        void 업로드에_실패할_경우_예외_발생() {
            // given
            ImageUploadClient imageUploadClient = mock(ImageUploadClient.class);
            when(imageUploadClient.uploadImage(any()))
                    .thenThrow(new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, "이미지 업로드 실패"));
            wishPictureService = setupWishPictureService(imageUploadClient);

            RoomUser roomUser = makeRoomUser();
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom()));
            MultipartFile picture = makeMockImageFile();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(wish.getId(), roomUser.getUser().getId(), picture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage("이미지 업로드 실패");
        }
    }

    @Nested
    class 위시_사진_삭제_케이스 {

        @Test
        void 위시_사진_생성_성공() {
            // given
            RoomUser roomUser = makeRoomUser();
            Picture picture = new Picture(DEFAULT_IMAGE_KEY_PREFIX, DEFAULT_IMAGE_URL);
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), picture));

            entityManager.flush();
            entityManager.clear();

            // when
            wishPictureService.deleteWishPictures(wish.getId(), roomUser.getUser().getId());

            // then
            Wish updatedWish = entityManager.find(Wish.class, wish.getId());
            assertThat(updatedWish.getRestaurantInfo().getPicture()).isNull();
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_삭제할_경우_예외_발생() {
            // given
            RoomUser roomUser = makeRoomUser();
            Picture picture = new Picture(DEFAULT_IMAGE_KEY_PREFIX, DEFAULT_IMAGE_URL);
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), picture));

            User otherUser = UserFixture.create();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(() -> wishPictureService.deleteWishPictures(wish.getId(), otherUser.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_PICTURE_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시_사진_수정_케이스 {

        @Test
        void 위시_사진_수정_성공() {
            // given
            RoomUser roomUser = makeRoomUser();
            Picture originPicture = new Picture("origin_key", "origin_download_url");
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), originPicture));

            entityManager.flush();
            entityManager.clear();

            MultipartFile newPicture = makeMockImageFile();

            // when
            WishPictureResponse response = wishPictureService.updateWishPictures(
                    wish.getId(),
                    roomUser.getUser().getId(),
                    newPicture);

            // then
            Wish updatedWish = entityManager.find(Wish.class, wish.getId());
            Picture updatedPicture = updatedWish.getRestaurantInfo().getPicture();
            assertAll(
                    () -> assertThat(response.wishId()).isEqualTo(wish.getId()),
                    () -> assertThat(response.imageDownloadUrl()).isEqualTo(DEFAULT_IMAGE_URL),
                    () -> assertThat(updatedPicture.getPictureKey()).startsWith(DEFAULT_IMAGE_KEY_PREFIX),
                    () -> assertThat(updatedPicture.getPictureUrl()).isEqualTo(DEFAULT_IMAGE_URL)
            );
        }


        @Test
        void 허용하지_않는_형식이_입력될_경우() {
            // given
            RoomUser roomUser = makeRoomUser();
            Picture originPicture = new Picture("origin_key", "origin_download_url");
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), originPicture));

            entityManager.flush();
            entityManager.clear();

            MultipartFile newPicture = mock(MultipartFile.class);
            when(newPicture.getContentType()).thenReturn("image/gif");

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), roomUser.getUser().getId(), newPicture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_ALLOWED_CONTENT_TYPE.getMessage());
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_생성할_경우_예외_발생() {
            // given
            RoomUser roomUser = makeRoomUser();
            Picture originPicture = new Picture("origin_key", "origin_download_url");
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), originPicture));

            User otherUser = entityManager.persist(UserFixture.create());

            MultipartFile newPicture = makeMockImageFile();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), otherUser.getId(), newPicture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_PICTURE_ACCESS_DENIED.getMessage());
        }

        @Test
        void 업로드에_실패할_경우_예외_발생() {
            // given
            ImageUploadClient imageUploadClient = mock(ImageUploadClient.class);
            when(imageUploadClient.uploadImage(any()))
                    .thenThrow(new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, "이미지 업로드 실패"));
            wishPictureService = setupWishPictureService(imageUploadClient);

            RoomUser roomUser = makeRoomUser();
            Picture originPicture = new Picture("origin_key", "origin_download_url");
            Wish wish = entityManager.persist(WishFixture.create(roomUser.getRoom(), originPicture));

            MultipartFile newPicture = makeMockImageFile();

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), roomUser.getUser().getId(), newPicture))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage("이미지 업로드 실패");
        }
    }

    WishPictureService setupWishPictureService(ImageUploadClient imageUploadClient) {
        return new WishPictureService(
                wishRepository,
                roomUserRepository,
                imageUploadClient
        );
    }

    MultipartFile makeMockImageFile() {
        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.getContentType()).thenReturn("image/jpeg");
        return mockFile;
    }

    RoomUser makeRoomUser() {
        Room room = entityManager.persist(RoomFixture.create());
        User user = entityManager.persist(UserFixture.create());
        return entityManager.persist(new RoomUser(room, user));
    }
}
