package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(PickeatService.class)
public class PickeatServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatService pickeatService;

    private Pickeat createExternalPickeat() {
        Pickeat pickeat = PickeatFixture.createExternal();
        return testEntityManager.persist(pickeat);
    }

    private List<Participant> createParticipantsInPickeat(Pickeat pickeat, int participantCount) {
        List<Participant> participants = new ArrayList<>();
        for (int i = 0; i < participantCount; i++) {
            String nickname = "닉네임" + i;
            Participant participant = new Participant(nickname, pickeat);
            participants.add(participant);

            // 짝수 번째 참여자는 소거 완료 상태로 설정
            if (i % 2 == 0) {
                participant.eliminateRestaurants();
            }

            pickeat.incrementParticipantCount();
            testEntityManager.persist(participant);
        }
        return participants;
    }

    private int countEliminatedParticipants(List<Participant> participants) {
        return (int) participants.stream()
                .filter(Participant::getIsEliminationCompleted)
                .count();
    }

    private Restaurant createRestaurantInPickeat(Pickeat pickeat, int likeCount) {
        Restaurant restaurant = RestaurantFixture.create(pickeat);
        for (int i = 0; i < likeCount; i++) {
            restaurant.like();
        }
        return testEntityManager.persist(restaurant);
    }

    @Nested
    class 픽잇_생성_케이스 {

        @Test
        void 픽잇_생성_성공() {
            // given
            PickeatRequest pickeatRequest = new PickeatRequest("픽잇");

            // when
            PickeatResponse pickeatResponse = pickeatService.createExternalPickeat(pickeatRequest);
            Pickeat savedPickeat = testEntityManager.find(Pickeat.class, pickeatResponse.id());

            // then
            assertThat(savedPickeat).isNotNull();
        }
    }

    @Nested
    class 픽잇_비활성화_케이스 {

        @Test
        void 픽잇_비활성화_성공() {
            // given
            Pickeat pickeat = createExternalPickeat();
            assertThat(pickeat.getIsActive()).isTrue();

            //when
            pickeatService.deactivatePickeat(pickeat.getCode().toString());

            //then
            assertThat(pickeat.getIsActive()).isFalse();
        }
    }

    @Nested
    class 픽잇_참여자_수_조회_케이스 {

        @Test
        void 픽잇_전체_참여자_수와_소거완료_여부_확인_성공() {
            //given
            Pickeat pickeat = createExternalPickeat();
            int totalParticipantCount = 5;
            List<Participant> participants = createParticipantsInPickeat(pickeat, totalParticipantCount);
            int eliminatedParticipantsCount = countEliminatedParticipants(participants);

            //when
            ParticipantStateResponse participantStateResponse = pickeatService.getParticipantStateSummary(
                    pickeat.getCode().toString());

            //then
            assertAll(
                    () -> assertThat(participantStateResponse.totalParticipants()).isEqualTo(totalParticipantCount),
                    () -> assertThat(participantStateResponse.eliminatedParticipants()).isEqualTo(
                            eliminatedParticipantsCount)
            );
        }
    }

    @Nested
    class 픽잇_조회_케이스 {

        @Test
        void 픽잇_조회_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(createExternalPickeat());
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatResponse pickeatResponse = pickeatService.getPickeat(pickeat.getCode().toString());

            // then
            assertThat(pickeatResponse.id()).isEqualTo(pickeat.getId());

        }
    }

    @Nested
    class 픽잇_결과_조회_케이스 {

        @Test
        void 픽잇_결과_조회_성공() {
            // given
            Pickeat pickeat = createExternalPickeat();
            Restaurant restaurant1 = createRestaurantInPickeat(pickeat, 0);
            Restaurant restaurant2 = createRestaurantInPickeat(pickeat, 3);
            Restaurant restaurant3 = createRestaurantInPickeat(pickeat, 3);

            // when
            List<RestaurantResponse> result = pickeatService.getPickeatResult(pickeat.getCode().toString());

            // then
            assertAll(
                    () -> assertThat(result).hasSize(2),
                    () -> assertThat(result.stream().map(RestaurantResponse::id))
                            .containsExactlyInAnyOrder(restaurant2.getId(), restaurant3.getId())
            );
        }

        @Test
        void 모든_식당이_소거된_경우_빈_리스트_반환() {
            // given
            Pickeat pickeat = createExternalPickeat();
            Restaurant restaurant1 = createRestaurantInPickeat(pickeat, 2);
            Restaurant restaurant2 = createRestaurantInPickeat(pickeat, 1);
            restaurant1.exclude();
            restaurant2.exclude();

            // when
            List<RestaurantResponse> result = pickeatService.getPickeatResult(pickeat.getCode().toString());

            // then
            assertThat(result).isEmpty();
        }

        @Test
        void 선호도가_0인_식당만_있을_경우_빈_리스트_반환() {
            // given
            Pickeat pickeat = createExternalPickeat();
            createRestaurantInPickeat(pickeat, 0);
            createRestaurantInPickeat(pickeat, 0);

            // when
            List<RestaurantResponse> result = pickeatService.getPickeatResult(pickeat.getCode().toString());

            // then
            assertThat(result).isEmpty();
        }
    }

    @Nested
    class 식당_조회_케이스 {

        @Test
        void 식당_조회_성공() {
            // given
            Pickeat pickeat = createExternalPickeat();
            createRestaurantInPickeat(pickeat, 0);
            createRestaurantInPickeat(pickeat, 0);

            // when
            List<RestaurantResponse> result = pickeatService.getPickeatRestaurants(pickeat.getCode().toString(), false);

            // then
            assertThat(result).hasSize(2);
        }
    }
}
