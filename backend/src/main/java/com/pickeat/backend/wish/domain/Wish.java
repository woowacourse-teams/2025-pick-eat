package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.FoodCategory;
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
public class Wish extends BaseEntity {

    @Column(nullable = false)
    String name;

    @Column(nullable = false)
    FoodCategory foodCategory;

    @Column(nullable = false)
    String roadAddressName;

    String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_list_id", nullable = false)
    WishList wishList;

    public Wish(String name, FoodCategory foodCategory, String roadAddressName, String tags, WishList wishList) {
        this.name = name;
        this.foodCategory = foodCategory;
        this.roadAddressName = roadAddressName;
        this.tags = tags;
        this.wishList = wishList;
    }
}
