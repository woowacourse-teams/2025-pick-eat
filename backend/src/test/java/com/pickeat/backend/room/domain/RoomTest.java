package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RoomTest {

    @Nested
    class 성공_케이스 {

        @Test
        void 유효한_정보로_방을_생성한다() {
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);

            Room room = new Room(name, location, radius);

            assertThat(room)
                    .extracting(Room::getName, Room::getLocation, Room::getRadius,
                            Room::getParticipantCount, Room::getIsActive)
                    .containsExactly(name, location, radius, 0, true);
            assertThat(room.getCode()).isNotNull();
        }

        @Test
        void 참가자_수를_여러_번_증가시킨다() {
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);

            room.incrementParticipantCount();

            assertThat(room.getParticipantCount()).isEqualTo(1);
        }

        @Test
        void 방을_비활성화한다() {
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);

            room.deactivate();

            assertThat(room.getIsActive()).isFalse();
        }
    }
}
