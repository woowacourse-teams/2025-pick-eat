package com.pickeat.backend.restaurant.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ParticipantLikes {
    private final Set<Long> participantIds = new HashSet<>();

    public void addAll(List<Long> participantIds) {
        this.participantIds.addAll(participantIds);
    }

    public int getCount() {
        return participantIds.size();
    }

    public void addParticipantId(Long participantId) {
        participantIds.add(participantId);
    }

    public void removeParticipantId(Long participantId) {
        participantIds.remove(participantId);
    }

    public boolean contains(Long participantId) {
        return participantIds.contains(participantId);
    }
}
