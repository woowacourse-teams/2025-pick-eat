package com.pickeat.backend.template.ui.api;

import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "탬플릿", description = "탬플릿 관련 API")
public interface TemplateApiSpec {

    @Operation(
            summary = "탬플릿 목록 조회",
            operationId = "getTemplates"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "탬플릿 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = TemplateResponse.class)))
            )
    })
    ResponseEntity<List<TemplateResponse>> getTemplates();
}
