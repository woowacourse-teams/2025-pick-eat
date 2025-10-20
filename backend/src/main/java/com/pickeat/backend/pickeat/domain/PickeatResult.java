package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PickeatResult extends BaseEntity {

    @Column(name = "pickeat_id", nullable = false, unique = true)
    private Long pickeatId;

    @Column(name = "restaurant_id", nullable = false, unique = true)
    private Long restaurantId;
}
