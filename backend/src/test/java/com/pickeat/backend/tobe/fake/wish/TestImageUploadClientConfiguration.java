package com.pickeat.backend.tobe.fake.wish;

import com.pickeat.backend.tobe.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("test")
@Configuration("TestImageUploadClientConfigurationV2")
public class TestImageUploadClientConfiguration {

    @Bean("ImageUploadClientV2")
    public ImageUploadClient localImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        return new FakeImageUploadClient(defaultImageUrl, keyPrefix);
    }
}
