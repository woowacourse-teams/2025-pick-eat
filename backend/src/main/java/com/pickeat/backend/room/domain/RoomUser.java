package com.pickeat.backend.room.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUser extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    //TODO: [P0] User 생긴 이후 직접 참조로 바꾸기  (2025-08-1, 금, 13:58)
    private Long userId;

    public RoomUser(Room room, Long userId) {
        this.room = room;
        this.userId = userId;
    }
}
