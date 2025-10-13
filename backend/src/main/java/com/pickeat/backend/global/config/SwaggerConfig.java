package com.pickeat.backend.global.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.models.PathItem;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecuritySchemes({
        @SecurityScheme(
                name = "UserAuth",
                type = SecuritySchemeType.HTTP,
                scheme = "bearer",
                bearerFormat = "JWT"
        ),
        @SecurityScheme(
                name = "ParticipantAuth",
                type = SecuritySchemeType.APIKEY,
                in = SecuritySchemeIn.HEADER,
                paramName = "Pickeat-Participant-Token"
        )
})
public class SwaggerConfig {

    @Bean
    public OpenApiCustomizer deprecatedLastSortCustomizer() {
        return openApi -> {
            if (openApi.getPaths() == null) {
                return;
            }

            Map<String, PathItem> sortedPaths = openApi.getPaths().entrySet().stream()
                    .sorted(getDeprecatedLastComparator())
                    .collect(LinkedHashMap::new,
                            (map, entry) -> map.put(entry.getKey(), entry.getValue()),
                            Map::putAll);

            openApi.setPaths(new io.swagger.v3.oas.models.Paths());
            sortedPaths.forEach(openApi.getPaths()::addPathItem);
        };
    }

    private Comparator<Entry<String, PathItem>> getDeprecatedLastComparator() {
        return (entry1, entry2) -> {
            boolean path1HasDeprecated = hasDeprecatedOperation(entry1.getValue());
            boolean path2HasDeprecated = hasDeprecatedOperation(entry2.getValue());

            int deprecatedCompare = Boolean.compare(path1HasDeprecated, path2HasDeprecated);
            if (deprecatedCompare != 0) {
                return deprecatedCompare;
            }

            return entry1.getKey().compareTo(entry2.getKey());
        };
    }

    private boolean hasDeprecatedOperation(PathItem pathItem) {
        return pathItem.readOperations().stream()
                .anyMatch(operation -> Boolean.TRUE.equals(operation.getDeprecated()));
    }
}
