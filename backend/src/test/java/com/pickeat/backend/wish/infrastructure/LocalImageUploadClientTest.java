package com.pickeat.backend.wish.infrastructure;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.mock;

import com.pickeat.backend.wish.domain.ImageUploadResult;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

class LocalImageUploadClientTest {

    private String defaultImageUrl = "default_image_url";
    private String keyPrefix = "/dir1/dir2/";
    private LocalImageUploadClient localImageUploadClient = new LocalImageUploadClient(defaultImageUrl, keyPrefix);

    @Test
    void 디폴트_이미지_URL을_반환한다() {
        // given
        MultipartFile image = mock(MultipartFile.class);

        // when
        ImageUploadResult imageUploadResult = localImageUploadClient.uploadImage(image);

        // then
        assertAll(
                () -> assertThat(imageUploadResult.getKey()).startsWith(keyPrefix),
                () -> assertThat(imageUploadResult.getDownloadUrl()).isEqualTo(defaultImageUrl)
        );
    }
}
