package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Participant;

public class ParticipantFixture {

    public static Participant create(Long pickeatId) {
        return new Participant("참가자", pickeatId);
    }
}
