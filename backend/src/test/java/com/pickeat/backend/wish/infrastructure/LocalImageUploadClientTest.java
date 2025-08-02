package com.pickeat.backend.wish.infrastructure;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

class LocalImageUploadClientTest {

    private String defaultImageUrl = "default_image_url";
    private LocalImageUploadClient localImageUploadClient = new LocalImageUploadClient(defaultImageUrl);

    @Test
    void 디폴트_이미지_URL을_반환한다() {
        // given
        MultipartFile image = mock(MultipartFile.class);

        // when
        String imageUrl = localImageUploadClient.uploadImage(image);

        // then
        assertThat(imageUrl).isEqualTo(defaultImageUrl);
    }
}
