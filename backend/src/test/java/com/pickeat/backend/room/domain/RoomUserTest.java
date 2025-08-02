package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import com.pickeat.backend.fixture.RoomFixture;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RoomUserTest {

    @Nested
    class 룸_유저_생성_케이스 {

        @Test
        void 룸과_유저로_룸유저_생성() {
            // given
            Room room = RoomFixture.create();
            Long userId = 1L;

            // when & then
            assertThatCode(() -> new RoomUser(room, userId))
                    .doesNotThrowAnyException();
        }
    }
}
