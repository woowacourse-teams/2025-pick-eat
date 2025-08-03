package com.pickeat.backend.fixture;

import com.pickeat.backend.room.domain.Room;

public class RoomFixture {
    public static Room create() {
        return new Room("테스트 방");
    }
}
