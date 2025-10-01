package com.pickeat.backend.tobe.user.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import com.pickeat.backend.user.domain.User;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

public class UserTest {

    @Nested
    class 유저_생성_케이스 {

        @Test
        void 유저_생성_성공() {
            // given
            String nickname = "닉네임";
            Long providerId = 1L;
            String provider = "kakao";

            // when & then
            assertThatCode(() -> new User(nickname, providerId, provider))
                    .doesNotThrowAnyException();
        }
    }
}
