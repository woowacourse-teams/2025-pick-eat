package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RoomTest {

    @Nested
    class 방_생성 {

        @Test
        void 유효한_정보로_방을_생성() {
            // given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);

            // when
            Room room = new Room(name, location, radius);

            // then
            assertThat(room)
                    .extracting(Room::getName, Room::getLocation, Room::getRadius,
                            Room::getParticipantCount, Room::getIsActive)
                    .containsExactly(name, location, radius, 0, true);
            assertThat(room.getCode()).isNotNull();
        }
    }

    @Nested
    class 참가자_수_증가_케이스 {

        @Test
        void 참가자_수_증가() {
            // given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);

            // when
            room.incrementParticipantCount();

            // then
            assertThat(room.getParticipantCount()).isEqualTo(1);
        }
    }

    @Nested
    class 방_비활성화_케이스 {

        @Test
        void 방_비활성화() {
            // given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);

            // when
            room.deactivate();

            // then
            assertThat(room.getIsActive()).isFalse();
        }
    }
}
