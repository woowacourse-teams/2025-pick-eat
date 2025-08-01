package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pickeat extends BaseEntity {

    @Embedded
    private PickeatCode code;

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

    public Pickeat(String name, Location location, Radius radius) {
        this.name = name;
        this.location = location;
        this.radius = radius;
        this.code = new PickeatCode();
    }

    public void incrementParticipantCount() {
        this.participantCount++;
    }

    public void deactivate() {
        this.isActive = false;
    }
}
