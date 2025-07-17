package com.pickeat.backend.room.application.dto;

import com.pickeat.backend.room.domain.Room;
import java.util.UUID;

public record RoomResponse(
        UUID code,
        String name,
        double x,
        double y,
        int radius,
        int participantCount,
        boolean isActive) {

    public static RoomResponse from(Room room) {
        return new RoomResponse(
                room.getCode(),
                room.getName(),
                room.getLocation().getX(),
                room.getLocation().getY(),
                room.getRadius().getDistance(),
                room.getParticipantCount(),
                room.isActive()
        );
    }
}
