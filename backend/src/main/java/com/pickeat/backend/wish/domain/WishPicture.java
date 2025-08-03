package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WishPicture extends BaseEntity {

    @Column(nullable = false)
    private String pictureKey;

    @Column(nullable = false)
    private String downloadUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_id", nullable = false)
    private Wish wish;

    public WishPicture(Wish wish, String pictureKey, String downloadUrl) {
        this.wish = wish;
        this.pictureKey = pictureKey;
        this.downloadUrl = downloadUrl;
    }
}
