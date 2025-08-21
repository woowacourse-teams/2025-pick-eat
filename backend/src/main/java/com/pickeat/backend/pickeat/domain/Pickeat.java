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

    @Column(nullable = false)
    private Integer participantCount = 0;

    @Column(nullable = false)
    private Boolean isActive = true;

    //TODO: 의도적으로 roomId 필드를 nullable하게 두는 것이 최선일지 의심이 드네요..  (2025-08-5, 화, 2:23)
    private Long roomId;

    private Pickeat(String name, Long roomId) {
        this.name = name;
        this.roomId = roomId;
        this.code = new PickeatCode();
    }

    public static Pickeat createWithoutRoom(String name) {
        return new Pickeat(name, null);
    }

    public static Pickeat createWithRoom(String name, Long roomId) {
        return new Pickeat(name, roomId);
    }

    public void incrementParticipantCount() {
        this.participantCount++;
    }

    public void deactivate() {
        this.isActive = false;
    }
}
