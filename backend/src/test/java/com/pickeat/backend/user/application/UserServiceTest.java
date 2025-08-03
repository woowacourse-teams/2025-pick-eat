package com.pickeat.backend.user.application;

import static com.pickeat.backend.global.exception.ErrorCode.ALREADY_NICKNAME_EXISTS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.login.application.dto.SignupRequest;
import com.pickeat.backend.user.application.dto.UserResponse;
import com.pickeat.backend.user.domain.User;
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
}
