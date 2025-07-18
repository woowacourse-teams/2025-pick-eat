package com.pickeat.backend.room.domain;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location {

    @Column(name = "x", nullable = false)
    private Double x;
    @Column(name = "y", nullable = false)
    private Double y;

    public Location(Double x, Double y) {
        validateCoordinates(x, y);
        this.x = x;
        this.y = y;
    }

    private void validateCoordinates(Double x, Double y) {
        if (x < -180.0 || x > 180.0) {
            throw new BusinessException(ErrorCode.INVALID_LONGITUDE);
        }
        if (y < -90.0 || y > 90.0) {
            throw new BusinessException(ErrorCode.INVALID_LATITUDE);
        }
    }
}
