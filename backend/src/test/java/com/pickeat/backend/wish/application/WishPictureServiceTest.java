package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.fixture.WishFixture;
import com.pickeat.backend.fixture.WishListFixture;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
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

    private WishPictureService wishPictureService;

    @BeforeEach
    void setup() {
        ImageUploadClient imageUploadClient = new LocalImageUploadClient("test_defaultUrl", "keyPrefix");
        wishPictureService = new WishPictureService(wishRepository, wishPictureRepository, imageUploadClient);
    }

    @Nested
    class 위시_사진_생성_케이스 {

        Wish makeWish() {
            WishList wishList = entityManager.persist(WishListFixture.createPrivate(1L));
            return entityManager.persist(WishFixture.create(wishList));
        }

        @Test
        void 위시_사진_생성_성공() {
            // given
            Wish wish = makeWish();
            List<MultipartFile> pictures = List.of(mock(MultipartFile.class), mock(MultipartFile.class));

            // when
            List<WishPictureResponse> responses = wishPictureService.createWishPicture(wish.getId(), pictures);

            // then
            assertAll(
                    () -> assertThat(responses).hasSize(pictures.size()),
                    () -> assertThat(wishPictureRepository.findAll()).hasSize(pictures.size())
            );
        }

        @Test
        void 업로드되지_않은_사진은_위시_사진으로_생성하지_않음() {
            // given
            ImageUploadClient imageUploadClient = mock(ImageUploadClient.class);
            when(imageUploadClient.uploadImage(any()))
                    .thenThrow(S3Exception.builder().message("첫번째 업로드는 실패").build())
                    .thenReturn(new ImageRequest("test_key", "test_downloadUrl"));
            wishPictureService = new WishPictureService(wishRepository, wishPictureRepository, imageUploadClient);

            Wish wish = makeWish();
            List<MultipartFile> pictures = List.of(mock(MultipartFile.class), mock(MultipartFile.class));

            // when & then
            assertThatThrownBy(() -> wishPictureService.createWishPicture(wish.getId(), pictures))
                    .isInstanceOf(S3Exception.class);
        }
    }
}
