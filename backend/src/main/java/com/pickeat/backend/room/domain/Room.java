package com.pickeat.backend.room.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room extends BaseEntity {

    @Column(nullable = false)
    private UUID code;
    @Column(nullable = false)
    private String name;
    @Embedded
    private Location location;
    @Embedded
    private Radius radius;
    @Column(nullable = false)
    private int participantCount = 0;
    @Column(nullable = false)
    private boolean isActive = true;
}
