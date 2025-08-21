package com.pickeat.backend.pickeat.ui.api;

import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "참여자 관리", description = "식당 선택 픽잇 참여자 관리 API")
public interface ParticipantApiSpec {

    @Operation(
            summary = "새 참여자 생성",
            operationId = "createParticipant",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "참여자 생성 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ParticipantRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "참여자 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터 (검증 실패)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "VALIDATION_FAILED",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "입력 데이터 검증에 실패했습니다.",
                                              "instance": "/api/v1/participants",
                                              "fieldErrors": {
                                                "name": "참여자 이름은 필수입니다.",
                                                "pickeatCode": "픽잇 코드는 필수입니다."
                                              }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "픽잇을 찾을 수 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "PICKEAT_NOT_FOUND",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/participants"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<TokenResponse> createParticipant(@Valid @RequestBody ParticipantRequest request);
}
