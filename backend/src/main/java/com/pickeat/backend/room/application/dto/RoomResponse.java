package com.pickeat.backend.room.application.dto;

import com.pickeat.backend.room.domain.Room;

public record RoomResponse(
        String code,
        String name,
        double x,
        double y,
        int radius,
        int participantCount,
        boolean isActive) {

    public static RoomResponse from(Room room) {
        return new RoomResponse(
                room.getCode().toString(),
                room.getName(),
                room.getLocation().getX(),
                room.getLocation().getY(),
                room.getRadius().getDistance(),
                room.getParticipantCount(),
                room.getIsActive()
        );
    }
}
