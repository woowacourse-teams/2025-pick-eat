package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.domain.User;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({PickeatService.class})
public class PickeatServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatService pickeatService;

    private Pickeat createWithoutRoomPickeat() {
        return testEntityManager.persist(PickeatFixture.createWithoutRoom());
    }

    private Participant createParticipant(Pickeat pickeat) {
        return testEntityManager.persist(ParticipantFixture.create(pickeat));
    }

    private List<Participant> createParticipantsInPickeat(Pickeat pickeat, int participantCount) {
        List<Participant> participants = new ArrayList<>();
        for (int i = 0; i < participantCount; i++) {
            String nickname = "닉네임" + i;
            Participant participant = new Participant(nickname, pickeat);
            participants.add(participant);

            // 짝수 번째 참여자는 투표 완료 상태로 설정
            if (i % 2 == 0) {
                participant.updateCompletionAs(true);
            }

            pickeat.incrementParticipantCount();
            testEntityManager.persist(participant);
        }
        return participants;
    }

    private int countCompletedParticipants(List<Participant> participants) {
        return (int) participants.stream()
                .filter(Participant::getIsCompleted)
                .count();
    }

    @Nested
    class 픽잇_생성_케이스 {

        @Test
        void 외부용_픽잇_생성_성공() {
            // given
            PickeatRequest pickeatRequest = new PickeatRequest("픽잇");

            // when
            PickeatResponse pickeatResponse = pickeatService.createPickeatWithoutRoom(pickeatRequest);

            // then
            Pickeat savedPickeat = testEntityManager.find(Pickeat.class, pickeatResponse.id());
            assertThat(savedPickeat).isNotNull();
        }

        @Test
        void 방_내부용_픽잇_생성_성공() {
            // given
            Room room = testEntityManager.persist(RoomFixture.create());
            User user = testEntityManager.persist(UserFixture.create());

            testEntityManager.persist(new RoomUser(room, user));

            PickeatRequest pickeatRequest = new PickeatRequest("픽잇");

            // when
            PickeatResponse pickeatResponse = pickeatService.createPickeatWithRoom(room.getId(), user.getId(),
                    pickeatRequest);

            // then
            Pickeat savedPickeat = testEntityManager.find(Pickeat.class, pickeatResponse.id());
            assertThat(savedPickeat).isNotNull();
            assertThat(savedPickeat.getRoomId()).isEqualTo(room.getId());
        }

    }

    @Nested
    class 픽잇_비활성화_케이스 {

        @Test
        void 픽잇_비활성화_성공() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(pickeat);

            //when
            pickeatService.deactivatePickeat(pickeat.getCode().toString(), participant.getId());

            //then
            assertThat(pickeat.getIsActive()).isFalse();
        }

        @Test
        void 픽잇에_속하지_않은_참여자가_비활성화시_예외() {
            // given
            Pickeat pickeat = createWithoutRoomPickeat();
            Pickeat otherPickeat = createWithoutRoomPickeat();
            Participant participant = createParticipant(otherPickeat);

            //when & then
            assertThatThrownBy(
                    () -> pickeatService.deactivatePickeat(pickeat.getCode().toString(), participant.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_ACCESS_DENIED.getMessage());
        }

    }

    @Nested
    class 픽잇_참여자_수_조회_케이스 {

        @Test
        void 픽잇_전체_참여자_수_확인_성공() {
            //given
            Pickeat pickeat = createWithoutRoomPickeat();
            int totalParticipantCount = 5;
            List<Participant> participants = createParticipantsInPickeat(pickeat, totalParticipantCount);
            int completedParticipantsCount = countCompletedParticipants(participants);

            //when
            ParticipantStateResponse participantStateResponse = pickeatService.getParticipantStateSummary(
                    pickeat.getCode().toString());

            //then
            assertAll(
                    () -> assertThat(participantStateResponse.totalParticipants()).isEqualTo(totalParticipantCount),
                    () -> assertThat(participantStateResponse.participants().stream().filter(
                            ParticipantResponse::isCompleted).count()).isEqualTo(completedParticipantsCount)
            );
        }
    }

    @Nested
    class 픽잇_조회_케이스 {

        @Test
        void 픽잇_조회_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(createWithoutRoomPickeat());
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatResponse pickeatResponse = pickeatService.getPickeat(pickeat.getCode().toString());

            // then
            assertThat(pickeatResponse.id()).isEqualTo(pickeat.getId());
        }
    }

    @Nested
    class 픽잇_상태_조회_케이스 {

        @Test
        void 활성화된_픽잇_상태_조회_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(createWithoutRoomPickeat());
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatStateResponse response = pickeatService.getPickeatState(pickeat.getCode().toString());

            // then
            assertThat(response.isActive()).isTrue();
        }

        @Test
        void 비활성화된_픽잇_상태_조회_성공() {
            // given
            Pickeat pickeat = testEntityManager.persist(createWithoutRoomPickeat());
            pickeat.deactivate();
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            PickeatStateResponse response = pickeatService.getPickeatState(pickeat.getCode().toString());

            // then
            assertThat(response.isActive()).isFalse();
        }

        @Test
        void 존재하지_않는_픽잇_코드로_상태_조회_시_예외() {
            // given
            String invalidCode = UUID.randomUUID().toString();

            // when & then
            assertThatThrownBy(() -> pickeatService.getPickeatState(invalidCode))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.PICKEAT_NOT_FOUND.getMessage());
        }
    }

    @Nested
    class 방의_활성화된_픽잇_리스트_조회_케이스 {

        @Test
        void 방의_활성화된_픽잇_리스트_조회_성공() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            Room room = testEntityManager.persist(RoomFixture.create());
            RoomUser roomUser = testEntityManager.persist(new RoomUser(room, user));
            List<Pickeat> pickeats = List.of(
                    testEntityManager.persist(PickeatFixture.createWithRoom(room.getId())),
                    testEntityManager.persist(PickeatFixture.createWithRoom(room.getId())));

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            List<PickeatResponse> responses = pickeatService.getActivePickeatInRoom(room.getId(), user.getId());

            // then
            List<Long> pickeatIds = pickeats.stream().map(Pickeat::getId).toList();
            assertThat(responses)
                    .extracting(PickeatResponse::id)
                    .containsExactlyInAnyOrderElementsOf(pickeatIds);
        }

        @Test
        void 회원이_방의_참가자가_아닌_경우_예외_발생() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            Room room = testEntityManager.persist(RoomFixture.create());
            List<Pickeat> pickeats = List.of(
                    testEntityManager.persist(PickeatFixture.createWithoutRoom()),
                    testEntityManager.persist(PickeatFixture.createWithoutRoom()));

            testEntityManager.flush();
            testEntityManager.clear();

            // when & then
            assertThatThrownBy(() -> pickeatService.getActivePickeatInRoom(room.getId(), user.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_ACCESS_DENIED.getMessage());
        }
    }
}
