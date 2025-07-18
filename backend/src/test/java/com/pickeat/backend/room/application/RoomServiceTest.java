package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Location;
import com.pickeat.backend.room.domain.Participant;
import com.pickeat.backend.room.domain.Radius;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.repository.ParticipantRepository;
import com.pickeat.backend.room.domain.repository.RoomRepository;
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
    private RoomRepository roomRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RoomService roomService;

    @Nested
    class 방_생성_케이스 {

        @Test
        void 방_생성_성공_테스트() {
            // given
            RoomRequest roomRequest = new RoomRequest("방", 50.0, 50.0, 100);
            // when
            RoomResponse roomResponse = roomService.createRoom(roomRequest);
            Room savedRoom = testEntityManager.find(Room.class, roomResponse.id());
            //then
            assertThat(savedRoom).isNotNull();
        }
    }

    @Nested
    class 방_비활성화_케이스 {

        @Test
        void 방_비활성화_성공_테스트() {
            // given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);
            assertThat(room.getIsActive()).isTrue();
            testEntityManager.persist(room);
            //when
            roomService.deactivateRoom(room.getCode().toString());
            //then
            assertThat(room.getIsActive()).isFalse();
        }
    }

    @Nested
    class 방_참여자_수_조회_케이스 {

        @Test
        void 방_전체_참여자_수와_소거완료_여부_확인_성공_테스트() {
            //given
            String name = "맛집 찾기";
            Location location = new Location(127.123, 37.456);
            Radius radius = new Radius(150);
            Room room = new Room(name, location, radius);
            testEntityManager.persist(room);
            int totalParticipantCount = 5;
            List<Participant> participants = new ArrayList<>();
            for (int i = 0; i < totalParticipantCount; i++) {
                String nickname = "닉네임" + i;
                Participant participant = new Participant(nickname, room);
                participants.add(participant);
                if (i % 2 == 0) {
                    participant.eliminateRestaurants();
                }
                room.incrementParticipantCount();
                testEntityManager.persist(participant);
            }

            int eliminatedParticipantsCount = (int) participants.stream()
                    .filter(participant -> participant.getIsEliminationCompleted()).count();
            //when
            ParticipantStateResponse participantStateResponse = roomService.getParticipantStateSummary(
                    room.getCode().toString());
            //then
            assertThat(participantStateResponse.totalParticipants()).isEqualTo(totalParticipantCount);
            assertThat(participantStateResponse.eliminatedParticipants()).isEqualTo(eliminatedParticipantsCount);
        }
    }
}
