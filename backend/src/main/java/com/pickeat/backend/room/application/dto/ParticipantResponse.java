package com.pickeat.backend.room.application.dto;

import com.pickeat.backend.room.domain.Participant;

public record ParticipantResponse(long id, String nickname, String roomCode) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                participant.getNickname(),
                participant.getRoom().getCode().toString()
        );
    }
}
