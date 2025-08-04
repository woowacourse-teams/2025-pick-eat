package com.pickeat.backend.pickeat.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.PickeatFixture;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ParticipantTest {

    @Nested
    class 참가자_생성 {

        @Test
        void 유효한_정보로_참가자를_생성() {
            // given
            String nickname = "테스트유저";
            Pickeat pickeat = PickeatFixture.createExternal();

            // when
            Participant participant = new Participant(nickname, pickeat);

            // then
            assertThat(participant)
                    .extracting(
                            Participant::getNickname,
                            Participant::getPickeat,
                            Participant::getIsEliminationCompleted)
                    .containsExactly(nickname, pickeat, false);
        }
    }
}
