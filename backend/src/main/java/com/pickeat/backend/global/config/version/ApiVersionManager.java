package com.pickeat.backend.global.config.version;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ApiVersionManager {

    private final Map<String, VersionInfo> versions = new LinkedHashMap<>();

    public ApiVersionManager() {
        registerVersion("v1", "2025-10-12", "v2");
        registerVersion("v2", null, null);
    }

    private void registerVersion(String version, String deprecationDate, String migrateTo) {
        versions.put(version, new VersionInfo(version, deprecationDate, migrateTo));
    }

    public boolean isDeprecated(String version) {
        VersionInfo versionInfo = versions.get(version);
        return versionInfo != null && versionInfo.deprecationDate() != null;
    }

    public String getLatestVersion() {
        return versions.entrySet().stream()
                .filter(entry -> entry.getValue().deprecationDate() == null)
                .map(Map.Entry::getKey)
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No latest version defined"));
    }

    public VersionInfo getVersionInfo(String version) {
        return versions.get(version);
    }

    public record VersionInfo(
            String version,
            String deprecationDate,
            String migrateTo
    ) {

    }
}
