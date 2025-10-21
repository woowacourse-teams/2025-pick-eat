package com.pickeat.backend.tobe.fake.wish;

import com.pickeat.backend.tobe.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"test"})
@Configuration("ImageUploadClientConfigurationV2")
public class ImageUploadClientConfiguration {

    @Bean("ImageUploadClientV2")
    public ImageUploadClient fakeImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        return new FakeImageUploadClient(defaultImageUrl, keyPrefix);
    }
}
