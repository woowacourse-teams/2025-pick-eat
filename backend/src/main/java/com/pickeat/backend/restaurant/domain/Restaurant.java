package com.pickeat.backend.restaurant.domain;


import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Location;
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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FoodCategory foodCategory;

    private Integer distance;

    @Column(nullable = false)
    private String roadAddressName;

    private String placeUrl;

    @Column(nullable = false)
    private Boolean isExcluded = false;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(nullable = false)
    private String tags;

    @Embedded
    private Location location;

    private String pictureUrls;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RestaurantType type;

    @ManyToOne
    @JoinColumn(name = "pickeat_id", nullable = false)
    private Pickeat pickeat;

    public Restaurant(String name, FoodCategory foodCategory, Integer distance, String roadAddressName, String placeUrl,
                      String tags, Location location, String pictureUrls, RestaurantType type, Pickeat pickeat) {
        this.name = name;
        this.foodCategory = foodCategory;
        this.distance = distance;
        this.roadAddressName = roadAddressName;
        this.placeUrl = placeUrl;
        this.tags = tags;
        this.location = location;
        this.type = type;
        this.pictureUrls = pictureUrls;
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
        if (this.likeCount <= 0) {
            throw new BusinessException(ErrorCode.LIKE_ALREADY_CANCELED);
        }
        this.likeCount--;
    }

    private void validatePickeatState() {
        if (!pickeat.getIsActive()) {
            throw new BusinessException(ErrorCode.PICKEAT_ALREADY_INACTIVE);
        }
    }

    public void validatePickeat(Pickeat pickeat) {
        if (!this.pickeat.equals(pickeat)) {
            throw new BusinessException(ErrorCode.FORBIDDEN_PICKEAT);
        }
    }
}
