package com.pickeat.backend.tobe.wish.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.tobe.change.RestaurantInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity(name = "WishV2")
@Table(name = "WishV2")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wish extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", nullable = false)
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
