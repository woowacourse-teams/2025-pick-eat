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
public class WishList extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long roomId;

    @Column(nullable = false)
    private boolean isPublic;
}
