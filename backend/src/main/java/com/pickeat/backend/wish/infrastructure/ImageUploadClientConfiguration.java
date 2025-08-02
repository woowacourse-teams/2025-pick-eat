package com.pickeat.backend.wish.infrastructure;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class ImageUploadClientConfiguration {

    @Bean
    @Profile({"local", "test"})
    public ImageUploadClient localImageUploadClient(@Value("${default.wish.image.url}") String defaultImageUrl) {
        return new LocalImageUploadClient(defaultImageUrl);
    }
}
