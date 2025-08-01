package com.pickeat.backend.room.application.dto.request;

import java.util.List;

public record RoomInvitationRequest(List<Long> userIds) {
}
