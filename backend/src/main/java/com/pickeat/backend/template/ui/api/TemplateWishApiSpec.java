package com.pickeat.backend.template.ui.api;

import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "탬플릿", description = "탬플릿 관련 API")
public interface TemplateWishApiSpec {

    @Operation(
            summary = "탬플릿의 위시 조회",
            operationId = "getWishesInTemplates"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "탬플릿의 위시 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = WishResponse.class)))
            )
    })
    ResponseEntity<List<TemplateWishResponse>> getWishesInTemplates(
            @Parameter(description = "탬플릿 ID", example = "1")
            @PathVariable("templateId") Long templateId
    );
}
