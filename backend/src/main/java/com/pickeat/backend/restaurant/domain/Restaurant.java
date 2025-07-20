package com.pickeat.backend.restaurant.domain;


import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Room;
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

    @Column(nullable = false)
    private Integer distance;

    @Column(nullable = false)
    private String roadAddressName;

    @Column(nullable = false)
    private String placeUrl;

    @Column(nullable = false)
    private Boolean isExcluded = false;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Embedded
    private Location location;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public Restaurant(
            String name,
            FoodCategory foodCategory,
            Integer distance,
            String roadAddressName,
            String placeUrl, Location location,
            Room room
    ) {
        this.name = name;
        this.foodCategory = foodCategory;
        this.distance = distance;
        this.roadAddressName = roadAddressName;
        this.placeUrl = placeUrl;
        this.location = location;
        this.room = room;
    }

    public void exclude() {
        if (!room.getIsActive()) {
            throw new IllegalArgumentException("비활성화된 방의 식당을 소거할 수 없습니다");
        }
        this.isExcluded = true;
    }

    public void like() {
        this.likeCount++;
    }

    public void cancelLike() {
        if (this.likeCount <= 0) {
            throw new IllegalArgumentException("더이상 좋아요 횟수를 줄일 수 없습니다.");
        }
        this.likeCount--;
    }

    public void validateRoom(Room room) {
        if (!this.room.equals(room)) {
            throw new IllegalArgumentException("식당의 방이 올바르지 않습니다.");
        }
    }
}
