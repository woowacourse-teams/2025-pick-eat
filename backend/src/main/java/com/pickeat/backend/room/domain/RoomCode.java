package com.pickeat.backend.room.domain;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.UUID;
import lombok.Getter;

@Embeddable
@Getter
public class RoomCode {

    @Column(name = "code", nullable = false, unique = true, columnDefinition = "BINARY(16)")
    private UUID value;

    public RoomCode() {
        this.value = UUID.randomUUID();
    }

    public RoomCode(String code) {
        this.value = parseRoomCode(code);
    }

    private UUID parseRoomCode(String roomCode) {
        if (roomCode == null || roomCode.trim().isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_ROOM_CODE);
        }

        try {
            return UUID.fromString(roomCode);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.INVALID_ROOM_CODE);
        }
    }

    @Override
    public String toString() {
        return value.toString();
    }
}
