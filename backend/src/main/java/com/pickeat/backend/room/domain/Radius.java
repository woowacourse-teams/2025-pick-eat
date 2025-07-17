package com.pickeat.backend.room.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Arrays;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
public class Radius {

    @Column(name = "radius", nullable = false)
    private int distance;

    public Radius(int distance) {
        validate(distance);
        this.distance = distance;
    }

    private void validate(int distance) {
        if (Distance.contains(distance)) {
            throw new IllegalArgumentException("설정되지 않은 거리입니다.");
        }
    }

    private enum Distance {

        M150(150),
        M300(300),
        M500(500);

        private final int meter;

        Distance(int meter) {
            this.meter = meter;
        }

        private static boolean contains(int meter) {
            return Arrays.stream(values())
                    .anyMatch(distance -> distance.meter == meter);
        }
    }
}
