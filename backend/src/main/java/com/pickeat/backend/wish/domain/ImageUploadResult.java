package com.pickeat.backend.wish.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ImageUploadResult {

    @Column(nullable = false)
    private String key;

    @Column(nullable = false)
    private String downloadUrl;

    public ImageUploadResult(String key, String downloadUrl) {
        this.key = key;
        this.downloadUrl = downloadUrl;
    }
}
