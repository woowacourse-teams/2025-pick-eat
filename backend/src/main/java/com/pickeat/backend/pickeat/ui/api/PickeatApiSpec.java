package com.pickeat.backend.pickeat.ui.api;

import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "픽잇 관리", description = "식당 선택 픽잇 관리 API")
public interface PickeatApiSpec {

    String 픽잇_코드_UUID_형식 = "픽잇 코드 (UUID 형식)";

    @Operation(
            summary = "새 픽잇 생성",
            operationId = "createPickeat",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "픽잇 생성 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "픽잇 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "@Valid 검증 실패",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "VALIDATION_FAILED",
                                                      "status": 400,
                                                      "detail": "입력 데이터 검증에 실패했습니다.",
                                                      "instance": "/api/v1/pickeats",
                                                      "fieldErrors": {
                                                        "name": "픽잇이름은 공백으로 입력할 수 없습니다.",
                                                        "x": "x 좌표는 NULL일 수 없습니다.",
                                                        "radius": "반경 범위는 NULL일 수 없습니다."
                                                      }
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "도메인 검증 실패",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "INVALID_RADIUS",
                                                      "status": 400,
                                                      "detail": "반지름은 1 ~ 20000 사이 양수여야 합니다.",
                                                      "instance": "/api/v1/pickeats"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<PickeatResponse> createPickeat(@Valid @RequestBody PickeatRequest request);

    @Operation(
            summary = "참여자 상태 요약 조회",
            operationId = "getParticipantStateSummary"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "참여자 상태 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ParticipantStateResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/pickeats/ABC123/participants/state"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<ParticipantStateResponse> getParticipantStateSummary(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "픽잇 비활성화",
            operationId = "deactivatePickeat"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "픽잇 비활성화 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/pickeats/ABC123/deactivate"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 비활성화된 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "이미 비활성화됨",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_ALREADY_INACTIVE",
                                              "status": 400,
                                              "detail": "이미 비활성화된 픽잇입니다.",
                                              "instance": "/api/v1/pickeats/ABC123/deactivate"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> deactivatePickeat(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "픽잇 정보 조회",
            operationId = "getPickeat"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "픽잇 정보 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/pickeats/ABC123"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<PickeatResponse> getPickeat(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "픽잇 결과 조회",
            operationId = "getPickeatResult"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "결과 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RestaurantResponse[].class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/pickeats/ABC123/result"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<RestaurantResponse>> getPickeatResult(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "픽잇 식당 목록 조회",
            operationId = "getPickeatRestaurants"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "식당 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RestaurantResponse[].class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "PICKEAT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "픽잇을 찾을 수 없습니다.",
                                              "instance": "/api/v1/pickeats/ABC123/restaurants"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<RestaurantResponse>> getPickeatRestaurants(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode,

            @Parameter(description = "소거 여부 필터 ( --: 전체 식당 조회, true: 소거된 식당만, false: 소거되지 않은 식당만)")
            @RequestParam(required = false) Boolean isExcluded
    );
}
