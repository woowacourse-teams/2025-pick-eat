package com.pickeat.backend.restaurant.domain;


import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Restaurant extends BaseEntity {

    @Embedded
    private RestaurantInfo restaurantInfo;

    @Column(nullable = false)
    private Boolean isExcluded = false;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RestaurantType type;

    @ManyToOne
    @JoinColumn(name = "pickeat_id", nullable = false)
    private Pickeat pickeat;

    /**
     * Creates a Restaurant with the provided identifying and display information and associates it with a Pickeat.
     *
     * @param name the restaurant's name
     * @param foodCategory the restaurant's food category
     * @param distance the distance to the restaurant in meters
     * @param roadAddressName the restaurant's road address (human-readable)
     * @param placeUrl a URL to the restaurant's place or listing
     * @param tags comma- or delimiter-separated tags describing the restaurant
     * @param pictureUrls serialized picture URLs (stored as a single string)
     * @param type the restaurant's type
     * @param pickeat the Pickeat instance this restaurant belongs to
     */
    public Restaurant(
            String name,
            FoodCategory foodCategory,
            Integer distance,
            String roadAddressName,
            String placeUrl,
            String tags,
            String pictureUrls,
            RestaurantType type,
            Pickeat pickeat
    ) {
        Picture picture = new Picture(null, pictureUrls);
        this.restaurantInfo = new RestaurantInfo(
                name,
                foodCategory,
                distance,
                roadAddressName,
                placeUrl,
                tags,
                picture);
        this.type = type;
        this.pickeat = pickeat;
    }

    public void exclude() {
        validatePickeatState();
        this.isExcluded = true;
    }

    public void like() {
        validatePickeatState();
        this.likeCount++;
    }

    public void cancelLike() {
        validatePickeatState();
        this.likeCount--;
    }

    /**
     * Validates that the associated Pickeat is active.
     *
     * @throws BusinessException if the associated Pickeat is inactive (ErrorCode.PICKEAT_ALREADY_INACTIVE)
     */
    private void validatePickeatState() {
        if (!pickeat.getIsActive()) {
            throw new BusinessException(ErrorCode.PICKEAT_ALREADY_INACTIVE);
        }
    }

    /**
     * Gets the restaurant's name.
     *
     * @return the name of the restaurant
     */
    public String getName() {
        return restaurantInfo.getName();
    }

    /**
     * Retrieves the restaurant's food category.
     *
     * @return the restaurant's {@link FoodCategory}
     */
    public FoodCategory getFoodCategory() {
        return restaurantInfo.getFoodCategory();
    }

    /**
     * Retrieves the restaurant's distance value.
     *
     * @return the distance for the restaurant, or {@code null} if not specified
     */
    public Integer getDistance() {
        return restaurantInfo.getDistance();
    }

    /**
     * Gets the restaurant's road address name.
     *
     * @return the road address name of the restaurant, or {@code null} if not available
     */
    public String getRoadAddressName() {
        return restaurantInfo.getRoadAddressName();
    }

    /**
     * Retrieves the restaurant's place URL.
     *
     * @return the place URL as a String, or null if not set
     */
    public String getPlaceUrl() {
        return restaurantInfo.getPlaceUrl();
    }

    /**
     * Retrieves the restaurant's tags as a single string.
     *
     * @return the tags associated with the restaurant, or {@code null} if not set
     */
    public String getTags() {
        return restaurantInfo.getTags();
    }

    /**
     * Get the restaurant's picture URLs string, or null if no picture is present.
     *
     * @return the picture URLs string, or `null` if the restaurant has no Picture
     */
    public String getPictureUrls() {
        if (restaurantInfo.getPicture() == null) {
            return null;
        }
        return restaurantInfo.getPicture().getPictureUrl();
    }
}
