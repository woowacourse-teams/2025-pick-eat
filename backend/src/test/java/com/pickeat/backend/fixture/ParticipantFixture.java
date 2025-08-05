package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;

public class ParticipantFixture {

    public static Participant create(String nickname, Pickeat pickeat) {
        return new Participant(nickname, pickeat);
    }
}
