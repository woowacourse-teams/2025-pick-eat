package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class RoomCodeTest {

    @Nested
    class 성공_케이스 {

        @Test
        void 기본_생성자로_UUID_룸코드를_생성한다() {
            RoomCode roomCode = new RoomCode();

            assertThat(roomCode.getValue()).isNotNull();
        }

        @Test
        void 문자열로_룸코드를_생성한다() {
            String uuidString = "123e4567-e89b-12d3-a456-426614174000";

            RoomCode roomCode = new RoomCode(uuidString);

            assertThat(roomCode.getValue().toString()).isEqualTo(uuidString);
        }

        @Test
        void toString_메서드가_UUID_문자열을_반환한다() {
            String uuidString = "123e4567-e89b-12d3-a456-426614174000";
            RoomCode roomCode = new RoomCode(uuidString);

            assertThat(roomCode.toString()).isEqualTo(uuidString);
        }
    }

    @Nested
    class 예외_케이스 {

        @Test
        void null_빈_문자열_및_공백_문자열로_룸코드_생성시_예외를_던진다() {
            assertThatThrownBy(() -> new RoomCode(null))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_ROOM_CODE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(strings = {"invalid-uuid", "123", "not-a-uuid", "1-2-3-4-5",
                "123e4567-e89b-12d3-a456-42661417400z"})
        void 유효하지_않은_UUID_형식으로_룸코드_생성시_예외를_던진다(String invalidUuid) {
            assertThatThrownBy(() -> new RoomCode(invalidUuid))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_ROOM_CODE.getMessage());
        }
    }
}
