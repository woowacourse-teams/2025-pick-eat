package com.pickeat.backend.pickeat.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class PickeatTest {

    @Nested
    class 픽잇_생성 {

        @Test
        void 유효한_정보로_픽잇을_생성() {
            // given
            String name = "맛집 찾기";

            // when
            Pickeat pickeat = Pickeat.createExternal(name);

            // then
            assertAll(
                    () -> assertThat(pickeat.getName()).isEqualTo(name),
                    () -> assertThat(pickeat.getParticipantCount()).isEqualTo(0),
                    () -> assertThat(pickeat.getIsActive()).isTrue(),
                    () -> assertThat(pickeat.getCode()).isNotNull()
            );
        }
    }

    @Nested
    class 참가자_수_증가_케이스 {

        @Test
        void 참가자_수_증가() {
            // given
            String name = "맛집 찾기";
            Pickeat pickeat = Pickeat.createExternal(name);

            // when
            pickeat.incrementParticipantCount();

            // then
            assertThat(pickeat.getParticipantCount()).isEqualTo(1);
        }
    }

    @Nested
    class 픽잇_비활성화_케이스 {

        @Test
        void 픽잇_비활성화() {
            // given
            String name = "맛집 찾기";
            Pickeat pickeat = Pickeat.createExternal(name);

            // when
            pickeat.deactivate();

            // then
            assertThat(pickeat.getIsActive()).isFalse();
        }
    }
}
