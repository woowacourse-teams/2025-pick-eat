package com.pickeat.backend.global.stress.image_upload.v1;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration
public class ImageUploadClientConfiguration {

    @Bean
    @Profile({"stress"})
    public ImageUploadClient localImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        System.out.println("dependency - StressImageUploadClientV1");
        return new StressImageUploadClientV1(defaultImageUrl, keyPrefix);
    }
}
