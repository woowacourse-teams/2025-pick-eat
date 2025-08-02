package com.pickeat.backend.wish.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ExternalApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

class S3ImageUploadClientTest {

    private String bucketName;
    private Region region;
    private S3Client s3Client;
    private S3ImageUploadClient uploadClient;

    @BeforeEach
    public void beforeEach() {
        s3Client = mock(S3Client.class);
        bucketName = "test_bucket";
        region = Region.AP_NORTHEAST_2;
        uploadClient = new S3ImageUploadClient(s3Client, bucketName, region);
    }

    @Nested
    class S3_이미지_업로드_케이스 {

        @Test
        void S3_이미지_업로드_성공() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "image",
                    "test.jpg",
                    "image/jpeg",
                    "dummy image content".getBytes());
            String uploadKey = "ROOM-14/WHISHLIST-13/WISH-10/uuid.png";

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenReturn(null);

            // when
            String result = uploadClient.uploadImage(multipartFile, uploadKey);

            // then
            assertThat(result)
                    .isEqualTo("https://" + bucketName + ".s3." + region.id() + ".amazonaws.com/" + uploadKey);
        }

        @Test
        void 서버측_오류_발생_예외처리() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "image",
                    "test.jpg",
                    "image/jpeg",
                    "dummy image content".getBytes());
            String uploadKey = "ROOM-14/WHISHLIST-13/WISH-10/uuid.png";

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(S3Exception.builder().message("sever error").build());

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile, uploadKey))
                    .isInstanceOf(ExternalApiException.class);
        }

        @Test
        void 클라이언측_오류_발생_예외처리() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "image",
                    "test.jpg",
                    "image/jpeg",
                    "dummy image content".getBytes());
            String uploadKey = "ROOM-14/WHISHLIST-13/WISH-10/uuid.png";

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(SdkClientException.builder().message("client error").build());

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile, uploadKey))
                    .isInstanceOf(ExternalApiException.class);
        }

        @Test
        void 이외의_예상치_못한_오류_발생_예외처리() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "image",
                    "test.jpg",
                    "image/jpeg",
                    "dummy image content".getBytes());
            String uploadKey = "ROOM-14/WHISHLIST-13/WISH-10/uuid.png";

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(new IllegalArgumentException("unexpected error"));

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile, uploadKey))
                    .isInstanceOf(BusinessException.class);
        }
    }
}
