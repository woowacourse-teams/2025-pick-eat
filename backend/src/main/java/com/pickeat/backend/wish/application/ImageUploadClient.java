package com.pickeat.backend.wish.application;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadClient {

    String uploadImage(MultipartFile multipartFile);
}
