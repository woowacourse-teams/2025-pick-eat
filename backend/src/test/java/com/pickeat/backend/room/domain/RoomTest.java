package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class RoomTest {

    @Nested
    class 방_생성_케이스 {

        @Test
        void 이름으로_방_생성() {
            // given
            String name = "테스트 방";

            // when & then
            assertThatCode(() -> new Room(name))
                    .doesNotThrowAnyException();
        }
    }
}
