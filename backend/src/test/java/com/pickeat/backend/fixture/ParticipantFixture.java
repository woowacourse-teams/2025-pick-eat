package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.UUID;

public class ParticipantFixture {

    public static Participant create(Pickeat pickeat) {
        return new Participant(UUID.randomUUID().toString(), pickeat);
    }
}
