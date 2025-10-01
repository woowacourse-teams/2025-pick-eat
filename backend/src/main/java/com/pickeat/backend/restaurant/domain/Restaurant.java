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

    private void validatePickeatState() {
        if (!pickeat.getIsActive()) {
            throw new BusinessException(ErrorCode.PICKEAT_ALREADY_INACTIVE);
        }
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
