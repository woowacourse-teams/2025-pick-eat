package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(RoomService.class)
class RoomServiceTest {
    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomUserRepository roomUserRepository;

    private Room createRoom(Long userId) {
        Room room = testEntityManager.persist(RoomFixture.create());
        testEntityManager.persist(new RoomUser(room, userId));
        return room;
    }

    @Nested
    class 방_생성_케이스 {

        @Test
        void 방_생성_성공() {
            // given
            Long userId = 1L;
            RoomRequest request = new RoomRequest("테스트");

            // when
            RoomResponse response = roomService.createRoom(request, userId);

            // then
            Room savedRoom = testEntityManager.find(Room.class, response.id());
            assertThat(savedRoom).isNotNull();
        }
    }

    @Nested
    class 방_조회_케이스 {

        @Test
        void 방_단일_조회() {
            // given
            Long userId = 1L;
            Room room = createRoom(userId);
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            RoomResponse response = roomService.getRoom(room.getId());

            // then
            assertAll(
                    () -> assertThat(response.id()).isEqualTo(room.getId()),
                    () -> assertThat(response.name()).isEqualTo(room.getName())
            );
        }

        @Test
        void 유저가_속한_방_조회() {
            // given
            Long userId = 1L;
            Long otherUserId = 2L;
            Room room1 = createRoom(userId);
            Room room2 = createRoom(userId);
            Room room3 = createRoom(otherUserId);

            testEntityManager.flush();
            testEntityManager.clear();
            // when
            List<RoomResponse> response = roomService.getAllRoom(userId);

            // then
            assertThat(response).hasSize(2);
        }
    }

    @Nested
    class 방_초대_케이스 {

        @Test
        void 방_초대_성공() {
            // given
            Long userId = 1L;
            Room room = createRoom(userId);
            List<Long> userIdsForInvitation = List.of(2L, 3L, 4L);
            RoomInvitationRequest request = new RoomInvitationRequest(userIdsForInvitation);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            roomService.inviteUsers(room.getId(), request);

            // then
            List<RoomUser> roomUsers = roomUserRepository.findAllByRoom(room);
            assertThat(roomUsers).hasSize(4);
        }
    }
}
