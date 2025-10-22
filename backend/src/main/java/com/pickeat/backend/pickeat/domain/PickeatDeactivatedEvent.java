package com.pickeat.backend.pickeat.domain;

public record PickeatDeactivatedEvent(Long pickeatId, String pickeatCode) {

    public static PickeatDeactivatedEvent from(Pickeat pickeat) {
        return new PickeatDeactivatedEvent(
                pickeat.getId(),
                pickeat.getCode().getValue().toString()
        );
    }
}
