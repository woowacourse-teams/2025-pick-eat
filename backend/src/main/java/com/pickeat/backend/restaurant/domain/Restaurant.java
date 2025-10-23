package com.pickeat.backend.restaurant.domain;


import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
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

    @Column(name = "pickeat_id", nullable = false)
    private Long pickeatId;

    public Restaurant(
            String name,
            FoodCategory foodCategory,
            Integer distance,
            String roadAddressName,
            String placeUrl,
            String tags,
            String pictureKey,
            String pictureUrls,
            Long pickeatId
    ) {
        Picture picture = new Picture(pictureKey, pictureUrls);
        this.restaurantInfo = new RestaurantInfo(
                name,
                foodCategory,
                distance,
                roadAddressName,
                placeUrl,
                tags,
                picture);
        this.pickeatId = pickeatId;
    }

    public void exclude() {
        this.isExcluded = true;
    }

    public String getName() {
        return restaurantInfo.getName();
    }

    public FoodCategory getFoodCategory() {
        return restaurantInfo.getFoodCategory();
    }

    public Integer getDistance() {
        return restaurantInfo.getDistance();
    }

    public String getRoadAddressName() {
        return restaurantInfo.getRoadAddressName();
    }

    public String getPlaceUrl() {
        return restaurantInfo.getPlaceUrl();
    }

    public String getTags() {
        return restaurantInfo.getTags();
    }

    public String getPictureUrls() {
        if (restaurantInfo.getPicture() == null) {
            return null;
        }
        return restaurantInfo.getPicture().getPictureUrl();
    }
}
