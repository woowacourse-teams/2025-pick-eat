package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PickeatResult extends BaseEntity {

    @Column(nullable = false, unique = true)
    private Long pickeatId;

    @Column(nullable = false, unique = true)
    private Long restaurantId;

    public PickeatResult(Long pickeatId, Long restaurantId) {
        this.pickeatId = pickeatId;
        this.restaurantId = restaurantId;
    }
}
