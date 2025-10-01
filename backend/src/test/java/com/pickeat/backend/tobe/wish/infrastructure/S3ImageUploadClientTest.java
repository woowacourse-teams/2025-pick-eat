package com.pickeat.backend.tobe.wish.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.wish.infrastructure.S3ImageUploadClient;
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

    private S3Client s3Client;
    private String bucketName;
    private Region region;
    private String keyPrefix;
    private com.pickeat.backend.wish.infrastructure.S3ImageUploadClient uploadClient;

    @BeforeEach
    public void beforeEach() {
        s3Client = mock(S3Client.class);
        bucketName = "test_bucket";
        keyPrefix = "dir1/dir2/";
        region = Region.AP_NORTHEAST_2;
        uploadClient = new S3ImageUploadClient(s3Client, bucketName, region, keyPrefix);
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

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenReturn(null);

            // when
            ImageRequest imageRequest = uploadClient.uploadImage(multipartFile);

            // then
            String expectedDownloadUrl = "https://" + bucketName + ".s3." + region.id() + ".amazonaws.com/" + keyPrefix;
            assertAll(
                    () -> assertThat(imageRequest.key()).startsWith(keyPrefix),
                    () -> assertThat(imageRequest.downloadUrl()).startsWith(expectedDownloadUrl)
            );
        }

        @Test
        void 서버측_오류_발생_예외처리() {
            // given
            MultipartFile multipartFile = new MockMultipartFile(
                    "image",
                    "test.jpg",
                    "image/jpeg",
                    "dummy image content".getBytes());

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(S3Exception.builder().message("sever error").build());

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile))
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

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(SdkClientException.builder().message("client error").build());

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile))
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

            when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                    .thenThrow(new IllegalArgumentException("unexpected error"));

            // when & then
            assertThatThrownBy(() -> uploadClient.uploadImage(multipartFile))
                    .isInstanceOf(BusinessException.class);
        }
    }
}
