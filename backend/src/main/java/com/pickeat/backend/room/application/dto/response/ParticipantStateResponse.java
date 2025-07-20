package com.pickeat.backend.room.application.dto.response;

public record ParticipantStateResponse(int totalParticipants, int eliminatedParticipants) {

    public static ParticipantStateResponse of(int totalParticipants, int eliminatedParticipants) {
        return new ParticipantStateResponse(totalParticipants, eliminatedParticipants);
    }
}
