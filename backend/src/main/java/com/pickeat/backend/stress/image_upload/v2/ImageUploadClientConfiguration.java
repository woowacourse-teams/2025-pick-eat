package com.pickeat.backend.stress.image_upload.v2;

import com.pickeat.backend.tobe.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration("StressImageUploadClientConfigurationV2")
public class ImageUploadClientConfiguration {

    @Bean("ImageUploadClientV2")
    @Profile({"stress"})
    public ImageUploadClient localImageUploadClientV2(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        System.out.println("dependency - StressImageUploadClientV2");
        return new StressImageUploadClientV2(defaultImageUrl, keyPrefix);
    }
}
