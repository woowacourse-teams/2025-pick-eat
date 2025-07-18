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
public class Radius {

    @Column(name = "radius", nullable = false)
    private Integer distance;
    
    public Radius(Integer distance) {
        validateDistance(distance);
        this.distance = distance;
    }
    
    private void validateDistance(Integer distance) {
        if (distance == null || distance <= 0) {
            throw new BusinessException(ErrorCode.INVALID_RADIUS);
        }
    }
}
