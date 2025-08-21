package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
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
    private Boolean isPublic;

    @OneToMany(mappedBy = "wishList", cascade = CascadeType.REMOVE)
    private final List<Wish> wishes = new ArrayList<>();

    public WishList(String name, Long roomId, Boolean isPublic) {
        this.name = name;
        this.roomId = roomId;
        this.isPublic = isPublic;
    }
}
