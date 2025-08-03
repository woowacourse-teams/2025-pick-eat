package com.pickeat.backend.wish.application;

import com.pickeat.backend.wish.domain.ImageUploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadClient {

    ImageUploadResult uploadImage(MultipartFile multipartFile);
}
