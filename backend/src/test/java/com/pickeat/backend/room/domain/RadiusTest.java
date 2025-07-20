package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class RadiusTest {

    @Nested
    class 반경_생성 {

        @ParameterizedTest
        @ValueSource(ints = {1, 150, 300, 500, 20000})
        void 유효한_반경으로_반경을_생성(int distance) {
            // given
            // when
            Radius radius = new Radius(distance);

            // then
            assertThat(radius.getDistance()).isEqualTo(distance);
        }

        @ParameterizedTest
        @ValueSource(ints = {0, -1, 20001})
        void 유효하지_않은_반경으로_생성시_예외(int invalidDistance) {
            // given
            // when & then
            assertThatThrownBy(() -> new Radius(invalidDistance))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_RADIUS.getMessage());
        }
    }
}
