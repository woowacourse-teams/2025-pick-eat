package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;

public class ParticipantFixture {

    public static Participant create(Pickeat pickeat) {
        return new Participant("테스트 닉네임", pickeat);
    }
}
