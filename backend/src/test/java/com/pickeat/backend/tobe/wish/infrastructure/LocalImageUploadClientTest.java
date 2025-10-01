package com.pickeat.backend.tobe.wish.infrastructure;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.mock;

import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.wish.infrastructure.LocalImageUploadClient;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

class LocalImageUploadClientTest {

    private final String defaultImageUrl = "default_image_url";
    private final String keyPrefix = "/dir1/dir2/";
    private final com.pickeat.backend.wish.infrastructure.LocalImageUploadClient localImageUploadClient = new LocalImageUploadClient(defaultImageUrl,
            keyPrefix);

    @Test
    void 디폴트_이미지_URL을_반환한다() {
        // given
        MultipartFile image = mock(MultipartFile.class);

        // when
        ImageRequest imageRequest = localImageUploadClient.uploadImage(image);

        // then
        assertAll(
                () -> assertThat(imageRequest.key()).startsWith(keyPrefix),
                () -> assertThat(imageRequest.downloadUrl()).isEqualTo(defaultImageUrl)
        );
    }
}
