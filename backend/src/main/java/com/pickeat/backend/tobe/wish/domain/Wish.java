package com.pickeat.backend.tobe.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.tobe.change.RestaurantInfo;
import com.pickeat.backend.tobe.room.domain.Room;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wish extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(nullable = false)
    private Room room;

    @Column(nullable = false)
    @Embedded
    private RestaurantInfo restaurantInfo;

    public Wish(Room room, RestaurantInfo restaurantInfo) {
        this.room = room;
        this.restaurantInfo = restaurantInfo;
    }

    public void updateRestaurantInfo(RestaurantInfo restaurantInfo) {
        this.restaurantInfo = restaurantInfo;
    }
}
