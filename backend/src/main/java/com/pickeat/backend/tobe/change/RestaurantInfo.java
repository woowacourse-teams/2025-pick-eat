package com.pickeat.backend.tobe.change;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantInfo {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "food_category", nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodCategory foodCategory;

    @Embedded
    @Column(nullable = false)
    private Distance distance;

    @Column(name = "road_address_name", nullable = false)
    private String roadAddressName;

    @Column(name = "place_url")
    private String placeUrl;

    @Column(name = "tags")
    private String tags;

    @Embedded
    private Picture picture;
}
