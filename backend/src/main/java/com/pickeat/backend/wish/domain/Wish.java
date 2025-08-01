package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(nullable = false)
    Long wishListId;
}
