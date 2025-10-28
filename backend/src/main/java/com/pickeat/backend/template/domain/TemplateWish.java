package com.pickeat.backend.template.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TemplateWish extends BaseEntity {

    private RestaurantInfo restaurantInfo;

    @Column(nullable = false)
    private Long templateId;

    public TemplateWish(RestaurantInfo restaurantInfo, Long templateId) {
        this.restaurantInfo = restaurantInfo;
        this.templateId = templateId;
    }
}
