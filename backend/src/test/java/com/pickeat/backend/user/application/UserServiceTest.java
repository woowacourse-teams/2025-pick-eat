package com.pickeat.backend.user.application;

import static com.pickeat.backend.global.exception.ErrorCode.ALREADY_NICKNAME_EXISTS;
import static com.pickeat.backend.global.exception.ErrorCode.USER_NOT_FOUND;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.fixture.UserFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.user.application.dto.UserResponse;
import com.pickeat.backend.user.domain.User;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {UserService.class})
class UserServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserService userService;

    @Nested
    class 유저_존재_여부_케이스 {

        @Test
        void 유저_존재_여부_확인_성공() {
            // given
            Long providerId = 1L;
            String provider = "kakao";
            User user = new User("유저", providerId, provider);
            entityManager.persist(user);
            entityManager.flush();
            entityManager.clear();

            // when & then
            assertThat(userService.isUserExist(providerId, provider)).isTrue();
        }

        @Test
        void 유저_존재_여부_확인_실패() {
            // when & then
            assertThat(userService.isUserExist(99L, "google")).isFalse();
        }
    }

    @Nested
    class 유저_생성_케이스 {

        @Test
        void 유저_생성_성공() {
            // given
            SignupRequest request = new SignupRequest("nickname");
            Long providerId = 2L;
            String provider = "kakao";

            // when
            UserResponse savedUser = userService.createUser(request, providerId, provider);

            // then
            assertAll(() -> assertThat(savedUser.id()).isNotNull(),
                    () -> assertThat(savedUser.nickname()).isEqualTo("nickname"),
                    () -> assertThat(savedUser.providerId()).isEqualTo(2L),
                    () -> assertThat(savedUser.provider()).isEqualTo("kakao"));
        }

        @Test
        void 닉네임_중복시_예외() {
            // given
            entityManager.persist(new User("nickname", 1L, "kakao"));
            SignupRequest request = new SignupRequest("nickname");

            // when & then
            assertThatThrownBy(() -> userService.createUser(request, 2L, "google")).isInstanceOf(
                    BusinessException.class).hasMessage(ALREADY_NICKNAME_EXISTS.getMessage());
        }
    }

    @Nested
    @DisplayName("유저 조회 케이스")
    class 유저_조회_케이스 {

        @Test
        @DisplayName("ID로 유저 조회 성공")
        void findUserByIdSuccess() {
            // given
            User user = UserFixture.create();
            entityManager.persist(user);
            entityManager.flush();
            entityManager.clear();

            // when
            UserResponse response = userService.getById(user.getId());

            // then
            assertThat(response.nickname()).isEqualTo(user.getNickname());
        }

        @Test
        @DisplayName("ID로 유저 조회 실패 시 예외 발생")
        void findUserByIdFail() {
            // when & then
            assertThatThrownBy(() -> userService.getById(999L))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(USER_NOT_FOUND.getMessage());
        }

        @Test
        @DisplayName("닉네임으로 유저 조회 성공")
        void findUserByNicknameSuccess() {
            // given
            User user = UserFixture.create();
            entityManager.persist(user);
            entityManager.flush();
            entityManager.clear();

            // when
            UserResponse response = userService.findByNickName(user.getNickname());

            // then
            assertThat(response.id()).isEqualTo(user.getId());
        }

        @Test
        @DisplayName("닉네임으로 유저 조회 실패 시 예외 발생")
        void findUserByNicknameFail() {
            // when & then
            assertThatThrownBy(() -> userService.findByNickName("없는유저"))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(USER_NOT_FOUND.getMessage());
        }
    }

    @Nested
    @DisplayName("닉네임으로 유저 검색 케이스")
    class 유저_검색_케이스 {

        @Test
        @DisplayName("닉네임 포함으로 여러 유저 검색 성공")
        void searchUsersByNicknameSuccess() {
            // given
            entityManager.persist(new User("테스트유저1", 1L, "kakao"));
            entityManager.persist(new User("테스트유저2", 2L, "kakao"));
            entityManager.persist(new User("유저", 2L, "kakao"));
            entityManager.persist(new User("테스트유저3", 3L, "kakao"));
            entityManager.flush();
            entityManager.clear();

            // when
            List<UserResponse> results = userService.searchByNickname("유저");

            // then
            assertAll(
                    () -> assertThat(results).hasSize(4),
                    () -> assertThat(results.stream().map(UserResponse::nickname).toList())
                            .containsExactlyInAnyOrder("유저", "테스트유저1", "테스트유저2", "테스트유저3")
            );
        }

        @Test
        @DisplayName("닉네임 검색 시 정확히 일치하는 닉네임이 맨 앞으로 정렬")
        void searchUsersByNicknameWithExactMatchFirst() {
            // given
            entityManager.persist(new User("테스트유저1", 1L, "kakao"));
            entityManager.persist(new User("유저", 2L, "kakao"));
            entityManager.persist(new User("테스트유저2", 3L, "kakao"));
            entityManager.flush();
            entityManager.clear();

            // when
            List<UserResponse> results = userService.searchByNickname("유저");

            // then
            assertAll(
                    () -> assertThat(results).hasSize(3),
                    () -> assertThat(results.getFirst().nickname()).isEqualTo("유저")
            );
        }

        @Test
        @DisplayName("검색 결과가 없을 경우 빈 리스트 반환")
        void searchUsersByNicknameEmptyResult() {
            // when
            List<UserResponse> results = userService.searchByNickname("없는유저");

            // then
            assertThat(results).isEmpty();
        }
    }

    @Nested
    @DisplayName("방 ID로 유저 목록 조회 케이스")
    class 방_유저_조회_케이스 {

        @Test
        @DisplayName("방에 참여한 유저 목록 조회 성공")
        void findUsersByRoomIdSuccess() {
            // given
            User user1 = new User("유저1", 1L, "kakao");
            User user2 = new User("유저2", 2L, "kakao");
            entityManager.persist(user1);
            entityManager.persist(user2);

            Room room = RoomFixture.create();
            entityManager.persist(room);

            entityManager.persist(new RoomUser(room, user1));
            entityManager.persist(new RoomUser(room, user2));
            entityManager.flush();
            entityManager.clear();

            // when
            List<UserResponse> results = userService.getByRoomId(room.getId());

            // then
            assertThat(results).hasSize(2);
        }
    }
}
