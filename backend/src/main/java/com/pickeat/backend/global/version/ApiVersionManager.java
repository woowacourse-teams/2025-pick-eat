package com.pickeat.backend.global.version;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.global.version.ApiVersionProperties.VersionInfo;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ApiVersionManager {

    private final Map<String, VersionInfo> versions = new LinkedHashMap<>();

    public ApiVersionManager(ApiVersionProperties config) {
        config.getVersions().forEach(v ->
                registerVersion(
                        v.getVersion(),
                        v.getDeprecationDate(),
                        v.getMigrateTo()
                )
        );
    }

    private void registerVersion(String version, String deprecationDate, String migrateTo) {
        String date = (deprecationDate == null || deprecationDate.isBlank()) ? null : deprecationDate;
        String target = (migrateTo == null || migrateTo.isBlank()) ? null : migrateTo;
        versions.put(version, new VersionInfo(version, date, target));
    }

    public boolean isDeprecated(String version) {
        VersionInfo versionInfo = versions.get(version);
        return versionInfo != null && versionInfo.getDeprecationDate() != null;
    }

    public String getLatestVersion() {
        return versions.entrySet().stream()
                .filter(entry -> entry.getValue().getDeprecationDate() == null)
                .map(Map.Entry::getKey)
                .findFirst()
                .orElseThrow(() -> new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR));
    }

    public VersionInfo getVersionInfo(String version) {
        return versions.get(version);
    }
}
