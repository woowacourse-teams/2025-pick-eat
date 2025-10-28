package com.pickeat.backend.stress.wish;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile({"stress"})
@Configuration
public class StressImageUploadClientConfiguration {

    @Bean
    public ImageUploadClient localImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        return new StressImageUploadClient(defaultImageUrl, keyPrefix);
    }
}
