package com.pickeat.backend.room.application.support;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import java.util.UUID;

public final class RoomCodeParser {

    private RoomCodeParser() {
        throw new AssertionError("Utility class");
    }

    public static UUID parseRoomCode(String roomCode) {
        if (roomCode == null || roomCode.trim().isEmpty()) {
            throw new BusinessException(ErrorCode.INVALID_ROOM_CODE);
        }

        try {
            return UUID.fromString(roomCode);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(ErrorCode.INVALID_ROOM_CODE);
        }
    }
}
