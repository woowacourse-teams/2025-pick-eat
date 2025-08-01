package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WishPicture extends BaseEntity {

    @Column(nullable = false)
    private String downloadUrl;

    @Column(nullable = false)
    private Long wishId;

    public WishPicture(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
