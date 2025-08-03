package com.pickeat.backend.wish.infrastructure;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.wish.application.ImageUploadClient;
import com.pickeat.backend.wish.domain.ImageUploadResult;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

public class S3ImageUploadClient implements ImageUploadClient {

    private final S3Client s3Client;
    private final String bucketName;
    private final Region region;
    private final String keyPrefix;

    public S3ImageUploadClient(
            S3Client s3Client,
            String bucketName,
            Region region,
            String keyPrefix
    ) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.region = region;
        this.keyPrefix = keyPrefix;
    }

    @Override
    public ImageUploadResult uploadImage(MultipartFile file) {
        try {
            String key = keyPrefix + UUID.randomUUID();
            PutObjectRequest putObj = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();
            s3Client.putObject(putObj, RequestBody.fromBytes(file.getBytes()));
            String downloadUrl = "https://" + bucketName + ".s3." + region.id() + ".amazonaws.com/" + key;
            return new ImageUploadResult(key, downloadUrl);
        } catch (S3Exception e) { // S3 API 서버 측 오류
            throw new ExternalApiException(e.getMessage(), "AWS-S3", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (SdkClientException e) { // 클라이언트 측에서 발생한 오류
            throw new ExternalApiException(e.getMessage(), "AWS-S3", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) { // 그외 오류
            throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
