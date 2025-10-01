package com.pickeat.backend.tobe.change;


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
public class Distance {

    @Column(name = "distance", nullable = false)
    private Integer distance;

    public Distance(Integer distance) {
        validateDistance(distance);
        this.distance = distance;
    }

    private void validateDistance(Integer distance) {
        if (distance <= 0 || distance > 20000) {
            throw new BusinessException(ErrorCode.INVALID_RADIUS);
        }
    }
}
