package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Pickeat;

public class PickeatFixture {

    public static Pickeat createExternal() {
        return Pickeat.createExternal("pickeat");
    }

    public static Pickeat createInRoom(Long roomId) {
        return Pickeat.createInRoom("pickeat", roomId);
    }
}
