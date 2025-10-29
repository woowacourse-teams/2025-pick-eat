package com.pickeat.backend.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wish extends BaseEntity {

    @Column(nullable = false)
    private Long roomId;

    @Column(nullable = false)
    @Embedded
    private RestaurantInfo restaurantInfo;

    public Wish(Long roomId, RestaurantInfo restaurantInfo) {
        this.roomId = roomId;
        this.restaurantInfo = restaurantInfo;
    }

    public void updateRestaurantInfo(RestaurantInfo restaurantInfo) {
        this.restaurantInfo = restaurantInfo;
    }
}
