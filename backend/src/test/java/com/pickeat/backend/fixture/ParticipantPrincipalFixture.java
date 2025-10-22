package com.pickeat.backend.fixture;

import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;

public class ParticipantPrincipalFixture {
    public static ParticipantPrincipal create(Participant participant, Pickeat pickeat) {
        return new ParticipantPrincipal(participant.getId(),
                pickeat.getCode().getValue().toString());
    }
}
