package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResultResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.UUID;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({PickeatResultService.class})
public class PickeatResultServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatResultService pickeatResultService;

    private Pickeat createWithoutRoomPickeat() {
        return testEntityManager.persist(PickeatFixture.createWithoutRoom());
    }

    private Participant createParticipant(Pickeat pickeat) {
        return testEntityManager.persist(ParticipantFixture.create(pickeat.getId()));
    }

    private Restaurant createRestaurantInPickeat(Pickeat pickeat, int likeCount) {
        Restaurant restaurant = RestaurantFixture.create(pickeat);
        for (int i = 0; i < likeCount; i++) {
            restaurant.like();
        }
        return testEntityManager.persist(restaurant);
    }

    @Nested
    class 픽잇_결과_생성_케이스 {

        @Test
        void 픽잇_결과_생성_성공() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);
            createRestaurantInPickeat(pickeat, 2);
            Restaurant restaurant2 = createRestaurantInPickeat(pickeat, 3);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatResultResponse response = pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), participant.getId());

            // then
            assertThat(response.id()).isEqualTo(restaurant2.getId());
        }

        @Test
        void 이미_결과가_존재할_경우_기존_결과_반환() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);
            Restaurant restaurant = createRestaurantInPickeat(pickeat, 3);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatResultResponse firstResponse = pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), participant.getId());
            PickeatResultResponse secondResponse = pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), participant.getId());

            // then
            assertAll(
                    () -> assertThat(firstResponse.id()).isEqualTo(restaurant.getId()),
                    () -> assertThat(secondResponse.id()).isEqualTo(restaurant.getId()),
                    () -> assertThat(firstResponse.id()).isEqualTo(secondResponse.id())
            );
        }

        @Test
        void 모든_식당이_소거된_경우_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);
            Restaurant restaurant1 = createRestaurantInPickeat(pickeat, 2);
            restaurant1.exclude();

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.RESTAURANTS_IS_EMPTY.getMessage());
        }

        @Test
        void 존재하지_않는_참여자로_접근시_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            createRestaurantInPickeat(pickeat, 3);
            Long invalidParticipantId = 999L;

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), invalidParticipantId))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PARTICIPANT_NOT_FOUND.getMessage());
        }

        @Test
        void 픽잇에_속하지_않은_참여자로_접근시_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Pickeat otherPickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(otherPickeat);
            createRestaurantInPickeat(pickeat, 3);

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.createPickeatResult(
                    pickeat.getCode().toString(), participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_ACCESS_DENIED.getMessage());
        }

        @Test
        void 존재하지_않는_픽잇_코드로_접근시_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);
            String invalidCode = String.valueOf(UUID.randomUUID());

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.createPickeatResult(invalidCode, participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_NOT_FOUND.getMessage());
        }

        @Test
        void 픽잇_결과_생성_후_픽잇_비활성화_확인() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);
            createRestaurantInPickeat(pickeat, 3);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            pickeatResultService.createPickeatResult(pickeat.getCode().toString(), participant.getId());

            // then
            Pickeat updatedPickeat = testEntityManager.find(Pickeat.class, pickeat.getId());
            assertThat(updatedPickeat.getIsActive()).isFalse();
        }
    }

    @Nested
    class 픽잇_결과_조회_케이스 {

        @Test
        void 픽잇_결과_조회_성공() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Restaurant restaurant = createRestaurantInPickeat(pickeat, 3);
            PickeatResult pickeatResult = new PickeatResult(pickeat.getId(), restaurant.getId());
            testEntityManager.persist(pickeatResult);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatResultResponse response = pickeatResultService.getPickeatResult(
                    pickeat.getCode().toString());

            // then
            assertThat(response.id()).isEqualTo(restaurant.getId());

        }

        @Test
        void 결과가_없을_경우_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.getPickeatResult(
                    pickeat.getCode().toString()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_RESULT_NOT_FOUND.getMessage());
        }

        @Test
        void 존재하지_않는_픽잇_코드로_접근시_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            String invalidCode = String.valueOf(UUID.randomUUID());

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatResultService.getPickeatResult(invalidCode))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_NOT_FOUND.getMessage());
        }
    }
}
