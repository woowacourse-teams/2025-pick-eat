package com.pickeat.backend.restaurant.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.pickeat.domain.Participant;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantLike extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    public RestaurantLike(Participant participant, Restaurant restaurant) {
        this.participant = participant;
        this.restaurant = restaurant;
    }
}
