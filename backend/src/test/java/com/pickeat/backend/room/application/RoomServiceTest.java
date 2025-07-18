package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Participant;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(RoomService.class)
public class RoomServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RoomService roomService;

    @Nested
    class 방_생성_케이스 {

        @Test
        void 방_생성_성공() {
            // given
            RoomRequest roomRequest = new RoomRequest("방", 50.0, 50.0, 100);
            // when
            RoomResponse roomResponse = roomService.createRoom(roomRequest);
            Room savedRoom = testEntityManager.find(Room.class, roomResponse.id());
            // then
            assertThat(savedRoom).isNotNull();
        }

        @ParameterizedTest
        @ValueSource(doubles = {-180.1, 180.1})
        void 범위가_벗어난_경도로_방_생성시_예외(double invalidLongitude) {
            // given
            RoomRequest roomRequest = new RoomRequest("방", invalidLongitude, 50.0, 100);
            // when & then
            assertThatThrownBy(() -> roomService.createRoom(roomRequest))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LONGITUDE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(doubles = {-90.1, 90.1})
        void 범위가_벗어난_위도로_방_생성시_예외(double invalidLatitude) {
            // given
            RoomRequest roomRequest = new RoomRequest("방", 50.0, invalidLatitude, 100);
            // when & then
            assertThatThrownBy(() -> roomService.createRoom(roomRequest))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LATITUDE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(ints = {0, -1, 20000})
        void 유효하지_않은_반경으로_방_생성시_예외(int invalidDistance) {
            // given
            RoomRequest roomRequest = new RoomRequest("방", 50.0, 50.0, invalidDistance);
            // when & then
            assertThatThrownBy(() -> roomService.createRoom(roomRequest))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_RADIUS.getMessage());
        }
    }

    @Nested
    class 방_비활성화_케이스 {

        @Test
        void 방_비활성화_성공() {
            // given
            Room room = createDefaultRoom();
            assertThat(room.getIsActive()).isTrue();

            //when
            roomService.deactivateRoom(room.getCode().toString());

            //then
            assertThat(room.getIsActive()).isFalse();
        }

        @Test
        void 존재하지_않는_방_비활성화_시_예외() {
            //given
            //when & then
            String nonExistentRoomCode = "00000000-0000-0000-0000-000000000000";
            assertThatThrownBy(() -> roomService.deactivateRoom(nonExistentRoomCode))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_NOT_FOUND.getMessage());
        }

        @ParameterizedTest
        @ValueSource(strings = {"invalid-uuid", "123", "not-a-uuid", "1-2-3-4-5",
                "123e4567-e89b-12d3-a456-42661417400z"})
        void 유효하지_않은_UUID_형식으로_방_비활성화시_예외(String invalidUuid) {
            //given
            //when & then
            assertThatThrownBy(() -> roomService.deactivateRoom(invalidUuid))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_ROOM_CODE.getMessage());
        }
    }

    @Nested
    class 방_참여자_수_조회_케이스 {

        @Test
        void 방_전체_참여자_수와_소거완료_여부_확인_성공() {
            //given
            Room room = createDefaultRoom();
            int totalParticipantCount = 5;
            List<Participant> participants = createParticipantsInRoom(room, totalParticipantCount);
            int eliminatedParticipantsCount = countEliminatedParticipants(participants);

            //when
            ParticipantStateResponse participantStateResponse = roomService.getParticipantStateSummary(
                    room.getCode().toString());

            //then
            assertThat(participantStateResponse.totalParticipants()).isEqualTo(totalParticipantCount);
            assertThat(participantStateResponse.eliminatedParticipants()).isEqualTo(eliminatedParticipantsCount);
        }

        @Test
        void 존재하지_않는_방의_경우_예외() {
            // given
            // when & then
            String nonExistentRoomCode = "00000000-0000-0000-0000-000000000000";
            assertThatThrownBy(() -> roomService.getParticipantStateSummary(nonExistentRoomCode))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_NOT_FOUND.getMessage());
        }

        @ParameterizedTest
        @ValueSource(strings = {"invalid-uuid", "123", "not-a-uuid", "1-2-3-4-5",
                "123e4567-e89b-12d3-a456-42661417400z"})
        void 유효하지_않은_UUID_형식일_경우_예외(String invalidUuid) {
            // given
            // when & then
            assertThatThrownBy(() -> roomService.getParticipantStateSummary(invalidUuid))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_ROOM_CODE.getMessage());
        }
    }

    @Nested
    class 방_조회_케이스 {

        @Test
        void 방_조회_성공() {
            // given
            String name = "맛집 찾기";
            double x = 127.123;
            double y = 37.456;
            int distance = 150;
            Room room = createRoom(name, x, y, distance);

            // when
            RoomResponse roomResponse = roomService.getRoom(room.getCode().toString());

            // then
            assertThat(roomResponse.name()).isEqualTo(name);
            assertThat(roomResponse.x()).isEqualTo(x);
            assertThat(roomResponse.y()).isEqualTo(y);
            assertThat(roomResponse.radius()).isEqualTo(distance);
        }

        @Test
        void 존재하지_않는_방_조회_시_예외() {
            // given
            // when & then
            String nonExistentRoomCode = "00000000-0000-0000-0000-000000000000";
            assertThatThrownBy(() -> roomService.getRoom(nonExistentRoomCode))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_NOT_FOUND.getMessage());
        }

        @ParameterizedTest
        @ValueSource(strings = {"invalid-uuid", "123", "not-a-uuid", "1-2-3-4-5",
                "123e4567-e89b-12d3-a456-42661417400z"})
        void 유효하지_않은_UUID_형식으로_방_조회시_예외(String invalidUuid) {
            // given
            // when & then
            assertThatThrownBy(() -> roomService.getRoom(invalidUuid))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_ROOM_CODE.getMessage());
        }
    }

    private Room createDefaultRoom() {
        return createRoom("맛집 찾기", 127.123, 37.456, 150);
    }


    private Room createRoom(String name, double x, double y, int distance) {
        Location location = new Location(x, y);
        Radius radius = new Radius(distance);
        Room room = new Room(name, location, radius);
        return testEntityManager.persist(room);
    }

    private List<Participant> createParticipantsInRoom(Room room, int participantCount) {
        List<Participant> participants = new ArrayList<>();
        for (int i = 0; i < participantCount; i++) {
            String nickname = "닉네임" + i;
            Participant participant = new Participant(nickname, room);
            participants.add(participant);

            // 짝수 번째 참여자는 소거 완료 상태로 설정
            if (i % 2 == 0) {
                participant.eliminateRestaurants();
            }

            room.incrementParticipantCount();
            testEntityManager.persist(participant);
        }
        return participants;
    }


    private int countEliminatedParticipants(List<Participant> participants) {
        return (int) participants.stream()
                .filter(Participant::getIsEliminationCompleted)
                .count();
    }
}
