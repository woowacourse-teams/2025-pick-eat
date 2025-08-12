package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.Restaurant;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PickeatResult extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickeat_id", unique = true)
    private Pickeat pickeat;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", unique = true)
    private Restaurant restaurant;

    private boolean hasEqualLike;
}
