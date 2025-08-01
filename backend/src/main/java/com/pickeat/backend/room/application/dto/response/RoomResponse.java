package com.pickeat.backend.room.application.dto.response;

import com.pickeat.backend.room.domain.Room;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "방 정보 응답")
public record RoomResponse(
        @Schema(description = "방 ID", example = "1")
        long id,
        @Schema(description = "방 이름", example = "점심 같이 먹어요")
        String name
) {
    public static RoomResponse from(Room room) {
        return new RoomResponse(room.getId(), room.getName());
    }

    public static List<RoomResponse> from(List<Room> rooms) {
        return rooms.stream()
                .map(RoomResponse::from)
                .toList();
    }
}
