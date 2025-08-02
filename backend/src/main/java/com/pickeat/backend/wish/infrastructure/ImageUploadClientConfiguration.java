package com.pickeat.backend.wish.infrastructure;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class ImageUploadClientConfiguration {

    @Bean
    @Profile({"local", "test"})
    public ImageUploadClient localImageUploadClient(@Value("${default.wish.image.url}") String defaultImageUrl) {
        return new LocalImageUploadClient(defaultImageUrl);
    }

    @Bean
    @Profile({"dev", "prod"})
    public ImageUploadClient s3ImageUploadClient(
            @Value("${external.s3.wish.image.bucket.name}") String bucketName,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        Region region = Region.AP_NORTHEAST_2;
        S3Client s3Client = S3Client.builder()
                .region(region)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
        return new S3ImageUploadClient(s3Client, bucketName, region, keyPrefix);
    }
}
