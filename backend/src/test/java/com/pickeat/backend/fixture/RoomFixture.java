package com.pickeat.backend.fixture;

import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;

public class RoomFixture {

    public static Room create() {
        return new Room(
                "room",
                new Location(127.103068896795, 37.5152535228382),
                new Radius(150)
        );
    }
}
