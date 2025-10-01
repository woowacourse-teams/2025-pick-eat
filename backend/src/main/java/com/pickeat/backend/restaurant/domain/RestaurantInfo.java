package com.pickeat.backend.restaurant.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantInfo {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "food_category", nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodCategory foodCategory;

    @Column(name = "road_address_name", nullable = false)
    private String roadAddressName;

    @Column(name = "distance")
    private Integer distance;

    @Column(name = "place_url")
    private String placeUrl;

    @Column(name = "tags")
    private String tags;

    @Embedded
    private Picture picture;

    public RestaurantInfo(String name,
                          FoodCategory foodCategory,
                          Integer distance,
                          String roadAddressName,
                          String placeUrl,
                          String tags,
                          Picture picture
    ) {
        this.name = name;
        this.foodCategory = foodCategory;
        this.distance = distance;
        this.roadAddressName = roadAddressName;
        this.placeUrl = placeUrl;
        this.tags = convertEmptyTagsToNull(tags);
        this.picture = picture;
    }

    private String convertEmptyTagsToNull(String tags) {
        if (tags == null || tags.isBlank()) {
            return null;
        }
        return tags;
    }
}
