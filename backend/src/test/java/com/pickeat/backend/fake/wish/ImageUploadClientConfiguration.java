package com.pickeat.backend.fake.wish;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"test"})
@Configuration
public class ImageUploadClientConfiguration {

    @Bean
    @Profile({"test"})
    public ImageUploadClient fakeImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        return new FakeImageUploadClient(defaultImageUrl, keyPrefix);
    }
}
