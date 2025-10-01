package com.pickeat.backend.template.application.dto.response;

import com.pickeat.backend.template.domain.Template;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "탬플릿 응답")
public record TemplateResponse(
        @Schema(description = "탬플릿 ID", example = "1")
        long id,
        @Schema(description = "탬플릿 이름", example = "잠실역 맛집")
        String name,
        @Schema(description = "위시의 개수", example = "3")
        int wishCount
) {

    /**
     * Create a TemplateResponse DTO from a Template domain object.
     *
     * @param template the domain Template to convert
     * @return a TemplateResponse containing the template's id, name, and the count of its wishes
     */
    public static TemplateResponse from(Template template) {
        return new TemplateResponse(
                template.getId(),
                template.getName(),
                template.getWishes().size()
        );
    }

    /**
     * Convert a list of Template domain objects to a list of TemplateResponse DTOs.
     *
     * @param wishLists the list of Template domain objects to convert
     * @return a list of TemplateResponse objects corresponding to the input templates
     */
    public static List<TemplateResponse> from(List<Template> wishLists) {
        return wishLists.stream()
                .map(TemplateResponse::from)
                .toList();
    }
}
