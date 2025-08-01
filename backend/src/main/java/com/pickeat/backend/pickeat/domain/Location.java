package com.pickeat.backend.pickeat.domain;

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
        validateLongitude(x);
        validateLatitude(y);
    }

    private void validateLongitude(Double x) {
        if (x < -180.0 || x > 180.0) {
            throw new BusinessException(ErrorCode.INVALID_LONGITUDE);
        }
    }

    private void validateLatitude(Double y) {
        if (y < -90.0 || y > 90.0) {
            throw new BusinessException(ErrorCode.INVALID_LATITUDE);
        }
    }
}
