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

    /**
     * Create a RestaurantInfo with the specified attributes.
     *
     * @param name the restaurant name
     * @param foodCategory the restaurant's food category
     * @param distance the distance to the restaurant in meters, or {@code null} if unknown
     * @param roadAddressName the road address of the restaurant
     * @param placeUrl a URL for the restaurant's place page, or {@code null} if not available
     * @param tags comma-separated tags for the restaurant; blank or {@code null} values are stored as {@code null}
     * @param picture an optional Picture for the restaurant, or {@code null} if none
     */
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

    /**
     * Normalize a tags string by converting blank or null input to `null`.
     *
     * @param tags the tags string to normalize; may be null or contain only whitespace
     * @return the original `tags` value, or `null` if `tags` is null or contains only whitespace
     */
    private String convertEmptyTagsToNull(String tags) {
        if (tags == null || tags.isBlank()) {
            return null;
        }
        return tags;
    }
}
