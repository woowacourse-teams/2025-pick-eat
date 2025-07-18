package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class RadiusTest {

    @Nested
    class 성공_케이스 {

        @ParameterizedTest
        @ValueSource(ints = {1, 150, 300, 500, 19999})
        void 유효한_반경으로_반경을_생성한다(int distance) {
            Radius radius = new Radius(distance);

            assertThat(radius.getDistance()).isEqualTo(distance);
        }
    }

    @Nested
    class 예외_케이스 {

        @Test
        void null_반경으로_생성시_예외를_던진다() {
            assertThatThrownBy(() -> new Radius(null))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_RADIUS.getMessage());
        }

        @ParameterizedTest
        @ValueSource(ints = {0, -1, 20000})
        void 유효하지_않은_반경으로_생성시_예외를_던진다(int invalidDistance) {
            assertThatThrownBy(() -> new Radius(invalidDistance))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_RADIUS.getMessage());
        }
    }
}
