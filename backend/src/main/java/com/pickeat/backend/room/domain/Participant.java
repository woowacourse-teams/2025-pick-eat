package com.pickeat.backend.room.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participant extends BaseEntity {

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Boolean isEliminationCompleted = false;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    public Participant(String nickname, Room room) {
        this.nickname = nickname;
        this.room = room;
    }
}
