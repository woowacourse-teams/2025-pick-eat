package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.Restaurant;
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
            assertAll(
                    () -> assertThat(participantStateResponse.totalParticipants()).isEqualTo(totalParticipantCount),
                    () -> assertThat(participantStateResponse.eliminatedParticipants()).isEqualTo(
                            eliminatedParticipantsCount)
            );
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
            assertAll(
                    () -> assertThat(roomResponse.name()).isEqualTo(name),
                    () -> assertThat(roomResponse.x()).isEqualTo(x),
                    () -> assertThat(roomResponse.y()).isEqualTo(y),
                    () -> assertThat(roomResponse.radius()).isEqualTo(distance)
            );
        }
    }

    @Nested
    class 방_결과_조회_케이스 {

        @Test
        void 방_결과_조회_성공() {
            // given
            Room room = createDefaultRoom();
            Restaurant restaurant1 = createRestaurantInRoom(room, 0);
            Restaurant restaurant2 = createRestaurantInRoom(room, 3);
            Restaurant restaurant3 = createRestaurantInRoom(room, 3);

            // when
            List<RestaurantResponse> result = roomService.getRoomResult(room.getCode().toString());

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
            Room room = createDefaultRoom();
            Restaurant restaurant1 = createRestaurantInRoom(room, 2);
            Restaurant restaurant2 = createRestaurantInRoom(room, 1);
            restaurant1.exclude();
            restaurant2.exclude();

            // when
            List<RestaurantResponse> result = roomService.getRoomResult(room.getCode().toString());

            // then
            assertThat(result).isEmpty();
        }

        @Test
        void 선호도가_0인_식당만_있을_경우_빈_리스트_반환() {
            // given
            Room room = createDefaultRoom();
            createRestaurantInRoom(room, 0);
            createRestaurantInRoom(room, 0);

            // when
            List<RestaurantResponse> result = roomService.getRoomResult(room.getCode().toString());

            // then
            assertThat(result).isEmpty();
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

    private Restaurant createRestaurantInRoom(Room room, int likeCount) {
        Restaurant restaurant = RestaurantFixture.create(room);
        for (int i = 0; i < likeCount; i++) {
            restaurant.like();
        }
        return testEntityManager.persist(restaurant);
    }
}
