package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wish extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodCategory foodCategory;

    @Column(nullable = false)
    private String roadAddressName;

    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wish_list_id", nullable = false)
    private WishList wishList;

    @OneToMany(mappedBy = "wish", cascade = CascadeType.REMOVE)
    private final List<WishPicture> wishPictures = new ArrayList<>();

    public Wish(
            String name,
            FoodCategory foodCategory,
            String roadAddressName,
            String tags,
            WishList wishList
    ) {
        this.name = name;
        this.foodCategory = foodCategory;
        this.roadAddressName = roadAddressName;
        this.tags = tags;
        this.wishList = wishList;
    }

    public void updateName(String name) {
        this.name = name;
    }

    public void updateFoodCategory(FoodCategory foodCategory) {
        this.foodCategory = foodCategory;
    }

    public void updateRoadAddressName(String roadAddressName) {
        this.roadAddressName = roadAddressName;
    }

    public void updateTags(String tags) {
        this.tags = tags;
    }
}
