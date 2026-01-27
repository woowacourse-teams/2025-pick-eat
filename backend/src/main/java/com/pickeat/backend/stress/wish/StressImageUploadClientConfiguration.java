package com.pickeat.backend.stress.wish;

import com.pickeat.backend.wish.application.ImageUploadClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Profile({"stress"})
@Configuration
public class StressImageUploadClientConfiguration {

    @Bean
    public ImageUploadClient localImageUploadClient(
            @Value("${default.wish.image.url}") String defaultImageUrl,
            @Value("${external.s3.wish.image.key.prefix}") String keyPrefix
    ) {
        log.warn("stress - StressImageUploadClient 활성화");
        return new StressImageUploadClient(defaultImageUrl, keyPrefix);
    }
}
