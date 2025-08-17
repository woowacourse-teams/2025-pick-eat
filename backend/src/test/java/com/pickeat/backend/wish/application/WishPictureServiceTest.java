package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.fixture.WishPictureFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishPictureRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import com.pickeat.backend.wish.infrastructure.LocalImageUploadClient;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

@DataJpaTest
class WishPictureServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private WishPictureRepository wishPictureRepository;

    @Autowired
    private RoomUserRepository roomUserRepository;

    private WishPictureService wishPictureService;

    @BeforeEach
    void setup() {
        ImageUploadClient imageUploadClient = new LocalImageUploadClient("test_defaultUrl", "keyPrefix");
        wishPictureService = setupWishPictureService(imageUploadClient);
    }

    @Nested
    class 위시_사진_생성_케이스 {

        @Test
        void 위시_사진_생성_성공() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile());

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishPictureResponse> responses = wishPictureService.createWishPicture(
                    wish.getId(),
                    roomUser.getUser().getId(),
                    pictures
            );

            // then
            assertAll(
                    () -> assertThat(responses).hasSize(pictures.size()),
                    () -> assertThat(wishPictureRepository.findAll()).hasSize(pictures.size())
            );
        }

        @Test
        void 업로드에_실패할_경우_예외_발생() {
            // given
            ImageUploadClient imageUploadClient = mock(ImageUploadClient.class);
            when(imageUploadClient.uploadImage(any()))
                    .thenThrow(S3Exception.builder().message("첫번째 업로드는 실패").build())
                    .thenReturn(new ImageRequest("test_key", "test_downloadUrl"));
            wishPictureService = setupWishPictureService(imageUploadClient);

            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(wish.getId(), roomUser.getUser().getId(), pictures))
                    .isInstanceOf(S3Exception.class);
        }

        @Test
        void 허용하지_않는_형식이_입력될_경우() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());

            MultipartFile mockFile = mock(MultipartFile.class);
            when(mockFile.getContentType()).thenReturn("image/gif");
            List<MultipartFile> pictures = List.of(mockFile);

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(wish.getId(), roomUser.getUser().getId(), pictures))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_ALLOWED_CONTENT_TYPE.getMessage());
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_생성할_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            User user = entityManager.persist(UserFixture.create());
            Wish wish = makeWish(room);
            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile());

            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.createWishPicture(
                            wish.getId(),
                            user.getId(),
                            pictures
                    ))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_PICTURE_ACCESS_DENIED.getMessage());
        }
    }

    @Nested
    class 위시_사진_삭제_케이스 {

        @Test
        void 위시_사진_생성_성공() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            List<WishPicture> wishPictures = List.of(WishPictureFixture.create(wish), WishPictureFixture.create(wish));

            entityManager.flush();
            entityManager.clear();

            // when
            wishPictureService.deleteWishPictures(wish.getId(), roomUser.getUser().getId());

            // then
            assertThat(wishPictureRepository.findAll()).isEmpty();
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_삭제할_경우_예외_발생() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            List<WishPicture> wishPictures = List.of(WishPictureFixture.create(wish), WishPictureFixture.create(wish));

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
            Wish wish = makeWish(roomUser.getRoom());
            List<WishPicture> wishPictures = List.of(
                    entityManager.persist(WishPictureFixture.create(wish)),
                    entityManager.persist(WishPictureFixture.create(wish)));

            entityManager.flush();
            entityManager.clear();

            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile(), makeMockImageFile());

            // when
            List<WishPictureResponse> response = wishPictureService.updateWishPictures(
                    wish.getId(),
                    roomUser.getUser().getId(),
                    pictures);

            // then
            List<Long> deletedPictureIds = wishPictures.stream().map(WishPicture::getId).toList();
            assertAll(
                    () -> assertThat(response).hasSize(3),
                    () -> assertThat(response)
                            .extracting(WishPictureResponse::id)
                            .doesNotContainAnyElementsOf(deletedPictureIds)
            );
        }

        @Test
        void 업로드에_실패할_경우_예외_발생() {
            // given
            ImageUploadClient imageUploadClient = mock(ImageUploadClient.class);
            when(imageUploadClient.uploadImage(any()))
                    .thenThrow(S3Exception.builder().message("첫번째 업로드는 실패").build())
                    .thenReturn(new ImageRequest("test_key", "test_downloadUrl"));
            wishPictureService = setupWishPictureService(imageUploadClient);

            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            WishPicture wishPicture = entityManager.persist(WishPictureFixture.create(wish));

            entityManager.flush();
            entityManager.clear();

            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile());

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), roomUser.getUser().getId(), pictures))
                    .isInstanceOf(S3Exception.class);
        }

        @Test
        void 허용하지_않는_형식이_입력될_경우() {
            // given
            RoomUser roomUser = makeRoomUser();
            Wish wish = makeWish(roomUser.getRoom());
            WishPicture wishPicture = entityManager.persist(WishPictureFixture.create(wish));

            entityManager.flush();
            entityManager.clear();

            MultipartFile mockFile = mock(MultipartFile.class);
            when(mockFile.getContentType()).thenReturn("image/gif");
            List<MultipartFile> pictures = List.of(mockFile);

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), roomUser.getUser().getId(), pictures))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.NOT_ALLOWED_CONTENT_TYPE.getMessage());
        }

        @Test
        void 방에_참가하지_않은_회원이_위시이미지를_생성할_경우_예외_발생() {
            // given
            Room room = entityManager.persist(RoomFixture.create());
            Wish wish = makeWish(room);
            WishPicture wishPicture = entityManager.persist(WishPictureFixture.create(wish));

            User otherUser = entityManager.persist(UserFixture.create());

            entityManager.flush();
            entityManager.clear();

            List<MultipartFile> pictures = List.of(makeMockImageFile(), makeMockImageFile());

            // when & then
            assertThatThrownBy(
                    () -> wishPictureService.updateWishPictures(wish.getId(), otherUser.getId(), pictures))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.WISH_PICTURE_ACCESS_DENIED.getMessage());
        }
    }

    WishPictureService setupWishPictureService(ImageUploadClient imageUploadClient) {
        return new WishPictureService(
                wishRepository,
                wishPictureRepository,
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

    Wish makeWish(Room room) {
        WishList wishList = entityManager.persist(WishListFixture.createPrivate(room.getId()));
        return entityManager.persist(WishFixture.create(wishList));
    }
}
