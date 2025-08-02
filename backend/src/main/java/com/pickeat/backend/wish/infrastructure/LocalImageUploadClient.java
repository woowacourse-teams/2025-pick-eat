package com.pickeat.backend.wish.infrastructure;

import com.pickeat.backend.wish.application.ImageUploadClient;
import org.springframework.web.multipart.MultipartFile;

public class LocalImageUploadClient implements ImageUploadClient {

    private final String DEFAULT_IMAGE_URL;

    public LocalImageUploadClient(String defaultImageUrl) {
        this.DEFAULT_IMAGE_URL = defaultImageUrl;
    }

    @Override
    public String uploadImage(MultipartFile multipartFile) {
        return DEFAULT_IMAGE_URL;
    }
}
