package com.pickeat.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

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
    class 위치_생성 {

        @Test
        void 유효한_좌표로_위치를_생성() {
            // given
            Double x = 127.123;
            Double y = 37.456;

            // when
            Location location = new Location(x, y);

            // then
            assertThat(location)
                    .extracting(Location::getX, Location::getY)
                    .containsExactly(x, y);
        }

        @Test
        void 경계값_좌표로_위치를_생성() {
            // given
            // when
            Location location1 = new Location(-180.0, -90.0);
            Location location2 = new Location(180.0, 90.0);

            // then
            assertAll(
                    () -> assertThat(location1)
                            .extracting(Location::getX, Location::getY)
                            .containsExactly(-180.0, -90.0),
                    () -> assertThat(location2)
                            .extracting(Location::getX, Location::getY)
                            .containsExactly(180.0, 90.0)
            );
        }

        @ParameterizedTest
        @ValueSource(doubles = {-180.1, 180.1})
        void 경도가_범위를_벗어나면_예외(double invalidLongitude) {
            // given
            // when & then
            assertThatThrownBy(() -> new Location(invalidLongitude, 37.456))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LONGITUDE.getMessage());
        }

        @ParameterizedTest
        @ValueSource(doubles = {-90.1, 90.1})
        void 위도가_범위를_벗어나면_예외(double invalidLatitude) {
            // given
            // when & then
            assertThatThrownBy(() -> new Location(127.123, invalidLatitude))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.INVALID_LATITUDE.getMessage());
        }
    }
}
