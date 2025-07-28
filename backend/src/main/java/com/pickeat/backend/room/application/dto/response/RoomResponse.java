package com.pickeat.backend.room.application.dto.response;

import com.pickeat.backend.room.domain.Room;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "방 응답")
public record RoomResponse(
        @Schema(description = "방 ID", example = "123")
        long id,

        @Schema(description = "방 코드 (UUID)", example = "abc123de-f456-789g-hijk-lmnopqrstuvw")
        String code,

        @Schema(description = "방 이름", example = "점심 맛집 찾기")
        String name,

        @Schema(description = "중심 위치의 x 좌표 (경도)", example = "127.134233269327")
        double x,

        @Schema(description = "중심 위치의 y 좌표 (위도)", example = "37.4098787808312")
        double y,

        @Schema(description = "검색 반경 (미터 단위)", example = "500")
        int radius,

        @Schema(description = "참여자 수", example = "5")
        int participantCount,

        @Schema(description = "방 활성화 상태", example = "true")
        boolean isActive
) {

    public static RoomResponse from(Room room) {
        return new RoomResponse(
                room.getId(),
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
