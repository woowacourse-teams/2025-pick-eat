package com.pickeat.backend.template.application.dto.response;

import com.pickeat.backend.template.domain.Template;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "템플릿 응답")
public record TemplateResponse(
        @Schema(description = "템플릿 ID", example = "1")
        long id,
        @Schema(description = "템플릿 이름", example = "잠실역 맛집")
        String name
) {

    public static TemplateResponse from(Template template) {
        return new TemplateResponse(
                template.getId(),
                template.getName()
        );
    }

    public static List<TemplateResponse> from(List<Template> wishLists) {
        return wishLists.stream()
                .map(TemplateResponse::from)
                .toList();
    }
}
