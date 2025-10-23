package com.pickeat.backend.fake.wish;

import com.pickeat.backend.wish.application.ImageUploadClient;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

public class FakeImageUploadClient implements ImageUploadClient {

    private final String defaultImageUrl;
    private final String keyPrefix;

    public FakeImageUploadClient(String defaultImageUrl, String keyPrefix) {
        this.defaultImageUrl = defaultImageUrl;
        this.keyPrefix = keyPrefix;
    }

    @Override
    public ImageRequest uploadImage(MultipartFile multipartFile) {
        String key = keyPrefix + UUID.randomUUID();
        return new ImageRequest(key, defaultImageUrl);
    }
}
