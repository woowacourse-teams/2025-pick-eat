package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ParticipantTest {

    @Nested
    class 참가자_생성 {

        @Test
        void 유효한_정보로_참가자를_생성() {
            // given
            String nickname = "테스트유저";
            Room room = createRoom();

            // when
            Participant participant = new Participant(nickname, room);

            // then
            assertThat(participant)
                    .extracting(
                            Participant::getNickname,
                            Participant::getRoom,
                            Participant::getIsEliminationCompleted)
                    .containsExactly(nickname, room, false);
        }
    }

    private Room createRoom() {
        String name = "맛집 찾기";
        Location location = new Location(127.123, 37.456);
        Radius radius = new Radius(1000);
        return new Room(name, location, radius);
    }
}
