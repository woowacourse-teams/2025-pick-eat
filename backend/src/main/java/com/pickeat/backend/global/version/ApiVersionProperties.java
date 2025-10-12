package com.pickeat.backend.global.version;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "api.docs")
public class ApiVersionProperties {

    private List<VersionInfo> versions = new ArrayList<>();

    @Setter
    @Getter
    @AllArgsConstructor
    public static class VersionInfo {

        private String version;
        private String deprecationDate;
        private String migrateTo;
    }
}
