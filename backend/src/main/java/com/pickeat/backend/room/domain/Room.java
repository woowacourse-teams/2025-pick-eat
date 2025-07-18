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

    @Column(columnDefinition = "BINARY(16)", unique = true, nullable = false)
    private UUID code;
    @Column(nullable = false)
    private String name;
    @Embedded
    private Location location;
    @Embedded
    private Radius radius;
    @Column(nullable = false)
    private Integer participantCount = 0;
    @Column(nullable = false)
    private Boolean isActive = true;

    public Room(String name, Location location, Radius radius) {
        this.name = name;
        this.location = location;
        this.radius = radius;
        this.code = UUID.randomUUID();
    }
}
