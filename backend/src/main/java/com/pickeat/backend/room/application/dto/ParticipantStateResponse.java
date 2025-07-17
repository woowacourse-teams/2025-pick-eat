package com.pickeat.backend.room.application.dto;

public record ParticipantStateResponse(int totalParticipants, int readyParticipants) {

    public static ParticipantStateResponse of(int totalParticipants, int readyParticipants) {
        return new ParticipantStateResponse(totalParticipants, readyParticipants);
    }
}
