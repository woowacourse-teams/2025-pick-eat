package com.pickeat.backend.restaurant.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantLike extends BaseEntity {

    @Column(nullable = false)
    private Long participantId;

    @Column(nullable = false)
    private Long restaurantId;

    public RestaurantLike(Long participantId, Long restaurantId) {
        this.participantId = participantId;
        this.restaurantId = restaurantId;
    }
}
