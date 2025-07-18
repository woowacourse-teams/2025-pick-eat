package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class LocationTest {

    @Nested
    class 성공_케이스 {

        @Test
        void 유효한_좌표로_위치를_생성한다() {
            Double x = 127.123;
            Double y = 37.456;

            Location location = new Location(x, y);

            assertThat(location)
                    .extracting(Location::getX, Location::getY)
                    .containsExactly(x, y);
        }

        @Test
        void 경계값_좌표로_위치를_생성한다() {
            Location location1 = new Location(-180.0, -90.0);
            Location location2 = new Location(180.0, 90.0);

            assertThat(location1)
                    .extracting(Location::getX, Location::getY)
                    .containsExactly(-180.0, -90.0);

            assertThat(location2)
                    .extracting(Location::getX, Location::getY)
                    .containsExactly(180.0, 90.0);
        }
    }

    @Nested
    class 예외_케이스 {

        @Test
        void null_경도로_위치_생성시_예외를_던진다() {
            assertThatThrownBy(() -> new Location(null, 37.456))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LONGITUDE.getMessage());
        }

        @Test
        void null_위도로_위치_생성시_예외를_던진다() {
            assertThatThrownBy(() -> new Location(127.123, null))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LATITUDE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(doubles = {-180.1, 180.1})
        void 경도가_범위를_벗어나면_예외를_던진다(double invalidLongitude) {
            assertThatThrownBy(() -> new Location(invalidLongitude, 37.456))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LONGITUDE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(doubles = {-90.1, 90.1})
        void 위도가_범위를_벗어나면_예외를_던진다(double invalidLatitude) {
            assertThatThrownBy(() -> new Location(127.123, invalidLatitude))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LATITUDE.getMessage());
        }
    }
}
