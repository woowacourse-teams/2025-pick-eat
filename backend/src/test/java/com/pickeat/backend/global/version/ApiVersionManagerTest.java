package com.pickeat.backend.global.version;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.version.ApiVersionProperties.VersionInfo;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ApiVersionManagerTest {

    private ApiVersionManager apiVersionManager;

    @BeforeEach
    void beforeEach() {
        ApiVersionProperties properties = new ApiVersionProperties();
        properties.setVersions(List.of(
                new VersionInfo("v1", "2026-01-01", "v2"),
                new VersionInfo("v2", null, null)
        ));
        apiVersionManager = new ApiVersionManager(properties);
    }

    @Nested
    class deprecated_여부_판단_케이스 {

        @Test
        void deprecationDate가_있는_버전은_deprecated이다() {
            // when & then
            assertThat(apiVersionManager.isDeprecated("v1")).isTrue();
        }

        @Test
        void deprecationDate가_없는_버전은_deprecated가_아니다() {
            // when & then
            assertThat(apiVersionManager.isDeprecated("v2")).isFalse();
        }

        @Test
        void 등록되지_않은_버전은_deprecated가_아니다() {
            // when & then
            assertThat(apiVersionManager.isDeprecated("v999")).isFalse();
        }
    }

    @Nested
    class 최신_버전_조회_케이스 {

        @Test
        void deprecationDate가_없는_가장_먼저_등록된_버전을_반환한다() {
            // when
            String latestVersion = apiVersionManager.getLatestVersion();

            // then
            assertThat(latestVersion).isEqualTo("v2");
        }

        @Test
        void 모든_버전이_deprecated이면_예외를_던진다() {
            // given
            ApiVersionProperties properties = new ApiVersionProperties();
            properties.setVersions(List.of(new VersionInfo("v1", "2026-01-01", "v2")));
            ApiVersionManager allDeprecatedManager = new ApiVersionManager(properties);

            // when & then
            assertThatThrownBy(allDeprecatedManager::getLatestVersion)
                    .isInstanceOf(BusinessException.class);
        }
    }

    @Nested
    class 버전_정보_조회_케이스 {

        @Test
        void 등록된_버전의_정보를_조회한다() {
            // when
            VersionInfo versionInfo = apiVersionManager.getVersionInfo("v1");

            // then
            assertThat(versionInfo.getDeprecationDate()).isEqualTo("2026-01-01");
            assertThat(versionInfo.getMigrateTo()).isEqualTo("v2");
        }

        @Test
        void 등록되지_않은_버전을_조회하면_null을_반환한다() {
            // when
            VersionInfo versionInfo = apiVersionManager.getVersionInfo("v999");

            // then
            assertThat(versionInfo).isNull();
        }
    }
}
