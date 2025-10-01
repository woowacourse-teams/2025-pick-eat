package com.pickeat.backend.template.domain;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TemplateWish extends BaseEntity {

    @Column(nullable = false)
    private RestaurantInfo restaurantInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", nullable = false)
    private Template template;

    public TemplateWish(RestaurantInfo restaurantInfo, Template template) {
        this.restaurantInfo = restaurantInfo;
        this.template = template;
    }
}
