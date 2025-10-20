package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.infrastructure.PickeatRepositoryImpl;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({ParticipantService.class, ParticipantTokenProvider.class, JwtProvider.class, PickeatRepositoryImpl.class})
class ParticipantServiceTest {

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private TestEntityManager testEntityManager;

    @Nested
    class 참가자_생성_케이스 {

        @Test
        void 참가자_생성_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            ParticipantRequest request = new ParticipantRequest("테스트유저", pickeat.getId());

            // when
            TokenResponse response = participantService.createParticipant(request);

            // then
            assertThat(response).isNotNull();
        }

        @Test
        void 존재하지_않는_픽잇의_참가자_생성시_예외() {
            // given
            // when & then
            ParticipantRequest request = new ParticipantRequest("테스트유저", Long.MAX_VALUE);
            assertThatThrownBy(() -> participantService.createParticipant(request))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_NOT_FOUND.getMessage());
        }
    }

    @Nested
    class 참가자_완료_여부_수정_케이스 {

        @Test
        void 참가자_완료_표시_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(Pickeat.createWithoutRoom("테스트"));
            Participant participant = testEntityManager.persist(ParticipantFixture.create(pickeat.getId()));
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            participantService.updateCompletion(participant.getId(), true);

            // then
            Participant updatedParticipant = testEntityManager.find(Participant.class, participant.getId());
            assertThat(updatedParticipant.getIsCompleted()).isTrue();
        }

        @Test
        void 참가자_미완료_표시_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(Pickeat.createWithoutRoom("테스트"));
            Participant participant = testEntityManager.persist(ParticipantFixture.create(pickeat.getId()));

            // when
            participantService.updateCompletion(participant.getId(), false);

            // then
            assertThat(participant.getIsCompleted()).isFalse();
        }
    }
}
