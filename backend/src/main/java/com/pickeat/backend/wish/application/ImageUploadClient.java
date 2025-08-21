package com.pickeat.backend.wish.application;

import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadClient {

    ImageRequest uploadImage(MultipartFile multipartFile);
}
