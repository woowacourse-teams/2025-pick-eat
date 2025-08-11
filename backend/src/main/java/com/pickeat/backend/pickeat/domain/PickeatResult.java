package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.Restaurant;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PickeatResult extends BaseEntity {

    @OneToOne
    private Pickeat pickeat;

    @OneToOne
    private Restaurant restaurant;

    private boolean isTied;

    private PickeatResult(Pickeat pickeat, Restaurant restaurant, boolean isTied) {
        this.pickeat = pickeat;
        this.restaurant = restaurant;
        this.isTied = isTied;
    }

    public static PickeatResult of(Pickeat pickeat, Restaurant restaurant, boolean isTied) {
        return new PickeatResult(pickeat, restaurant, isTied);
    }
}
