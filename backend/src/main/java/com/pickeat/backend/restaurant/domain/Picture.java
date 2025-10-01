package com.pickeat.backend.restaurant.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Picture {

    @Column(name = "picture_key")
    private String pictureKey;

    @Column(name = "picture_url")
    private String downloadUrl;
}
