package com.pickeat.backend.room.application.dto.response;

import com.pickeat.backend.room.domain.Room;
import java.util.List;

public record RoomResponse(long id, String name) {
    public static RoomResponse from(Room room) {
        return new RoomResponse(room.getId(), room.getName());
    }

    public static List<RoomResponse> from(List<Room> rooms) {
        return rooms.stream()
                .map(RoomResponse::from)
                .toList();
    }
}
