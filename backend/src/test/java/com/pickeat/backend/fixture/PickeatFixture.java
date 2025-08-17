package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Pickeat;

public class PickeatFixture {

    public static Pickeat createWithoutRoom() {
        return Pickeat.createWithoutRoom("pickeat");
    }

    public static Pickeat createWithRoom(Long roomId) {
        return Pickeat.createWithRoom("pickeat", roomId);
    }

    public static Pickeat createInactiveWithoutRoom() {
        Pickeat pickeat = createWithoutRoom();
        pickeat.deactivate();
        return pickeat;
    }
}
