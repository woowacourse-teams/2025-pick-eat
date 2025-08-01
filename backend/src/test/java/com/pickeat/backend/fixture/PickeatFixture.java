package com.pickeat.backend.fixture;

import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.Radius;

public class PickeatFixture {

    public static Pickeat create() {
        return new Pickeat(
                "pickeat",
                new Location(127.103068896795, 37.5152535228382),
                new Radius(150)
        );
    }
}
