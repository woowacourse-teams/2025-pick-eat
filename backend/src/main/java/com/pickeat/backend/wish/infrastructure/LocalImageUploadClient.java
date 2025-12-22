package com.pickeat.backend.wish.infrastructure;

import com.pickeat.backend.wish.application.ImageUploadClient;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
public class LocalImageUploadClient implements ImageUploadClient {

    private final String defaultImageUrl;
    private final String keyPrefix;

    public LocalImageUploadClient(String defaultImageUrl, String keyPrefix) {
        this.defaultImageUrl = defaultImageUrl;
        this.keyPrefix = keyPrefix;
        log.info("LocalImageUploadClient created");
    }

    @Override
    public ImageRequest uploadImage(MultipartFile multipartFile) {
        String key = keyPrefix + UUID.randomUUID();
        return new ImageRequest(key, defaultImageUrl);
    }
}
