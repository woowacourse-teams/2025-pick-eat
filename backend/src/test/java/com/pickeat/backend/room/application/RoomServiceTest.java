package com.pickeat.backend.room.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.user.domain.User;
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

    private Room createRoom(User user) {
        Room room = testEntityManager.persist(RoomFixture.create());
        testEntityManager.persist(new RoomUser(room, user));
        return room;
    }

    @Nested
    class 방_생성_케이스 {

        @Test
        void 방_생성_성공() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            RoomRequest request = new RoomRequest("테스트");
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            RoomResponse response = roomService.createRoom(request, user.getId());

            // then
            Room savedRoom = testEntityManager.find(Room.class, response.id());
            assertThat(savedRoom).isNotNull();
        }
    }

    @Nested
    class 방_조회_케이스 {

        @Test
        void 방_단일_조회_성공() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            Room room = createRoom(user);
            testEntityManager.flush();
            testEntityManager.clear();

            // when
            RoomResponse response = roomService.getRoom(room.getId(), user.getId());

            // then
            assertAll(
                    () -> assertThat(response.id()).isEqualTo(room.getId()),
                    () -> assertThat(response.name()).isEqualTo(room.getName())
            );
        }

        @Test
        void 속하지_않은_방_조회시_예외() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User otherUser = testEntityManager.persist(UserFixture.create());
            Room room = createRoom(otherUser);

            testEntityManager.flush();
            testEntityManager.clear();

            // when && then
            assertThatThrownBy(() -> roomService.getRoom(room.getId(), user.getId()))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_ACCESS_DENIED.getMessage());
        }

        @Test
        void 유저가_속한_방_조회() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User otherUser = testEntityManager.persist(UserFixture.create());
            createRoom(user);
            createRoom(user);
            createRoom(otherUser);

            testEntityManager.flush();
            testEntityManager.clear();
            // when
            List<RoomResponse> response = roomService.getAllRoom(user.getId());

            // then
            assertThat(response).hasSize(2);
        }
    }

    @Nested
    class 방_초대_케이스 {

        @Test
        void 방_초대_성공() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User invitedUser1 = testEntityManager.persist(UserFixture.create());
            User invitedUser2 = testEntityManager.persist(UserFixture.create());
            User invitedUser3 = testEntityManager.persist(UserFixture.create());

            Room room = createRoom(user);
            List<Long> userIdsForInvitation = List.of(invitedUser1.getId(), invitedUser2.getId(), invitedUser3.getId());
            RoomInvitationRequest request = new RoomInvitationRequest(userIdsForInvitation);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            roomService.inviteUsers(room.getId(), user.getId(), request);

            // then
            List<RoomUser> roomUsers = roomUserRepository.findAllByRoom(room);
            assertThat(roomUsers).hasSize(4);
        }

        @Test
        void 중복_초대시_중복_제거하여_초대() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User invitedUser1 = testEntityManager.persist(UserFixture.create());
            User invitedUser2 = testEntityManager.persist(UserFixture.create());

            Room room = createRoom(user);

            // invitedUser1의 id가 2번 들어감
            List<Long> userIdsForInvitation = List.of(invitedUser1.getId(), invitedUser1.getId(), invitedUser2.getId());
            RoomInvitationRequest request = new RoomInvitationRequest(userIdsForInvitation);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            roomService.inviteUsers(room.getId(), user.getId(), request);

            // then
            List<RoomUser> roomUsers = roomUserRepository.findAllByRoom(room);
            assertThat(roomUsers).hasSize(3);
        }

        @Test
        void 이미_초대된_유저를_초대시_무시하고_성공_처리() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User invitedUser = testEntityManager.persist(UserFixture.create());

            Room room = createRoom(user);

            List<Long> userIdsForInvitation = List.of(invitedUser.getId());
            RoomInvitationRequest request = new RoomInvitationRequest(userIdsForInvitation);

            testEntityManager.flush();
            testEntityManager.clear();

            // when
            // 2번 초대
            roomService.inviteUsers(room.getId(), user.getId(), request);
            roomService.inviteUsers(room.getId(), user.getId(), request);

            // then
            List<RoomUser> roomUsers = roomUserRepository.findAllByRoom(room);
            assertThat(roomUsers).hasSize(2);
        }

        @Test
        void 속하지_않은_방에_초대시_예외() {
            // given
            User user = testEntityManager.persist(UserFixture.create());
            User otherUser = testEntityManager.persist(UserFixture.create());
            User invitedUser = testEntityManager.persist(UserFixture.create());

            Room room = createRoom(otherUser);
            List<Long> userIdsForInvitation = List.of(invitedUser.getId());
            RoomInvitationRequest request = new RoomInvitationRequest(userIdsForInvitation);

            testEntityManager.flush();
            testEntityManager.clear();

            // when && then
            assertThatThrownBy(() -> roomService.inviteUsers(room.getId(), user.getId(), request))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.ROOM_ACCESS_DENIED.getMessage());

        }
    }
}
