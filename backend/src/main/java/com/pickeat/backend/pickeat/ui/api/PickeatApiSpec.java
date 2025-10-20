package com.pickeat.backend.pickeat.ui.api;

import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatRejoinAvailableResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResultResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "픽잇 관리", description = "식당 선택 픽잇 관리 API")
public interface PickeatApiSpec {

    String 픽잇_코드_UUID_형식 = "픽잇 코드 (UUID 형식)";

    @Operation(
            summary = "외부용 새 픽잇 생성",
            description = "로그인 없이 외부 사용자를 위해 새로운 픽잇을 생성합니다.",
            operationId = "createExternalPickeat",
            requestBody = @RequestBody(
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
    ResponseEntity<PickeatResponse> createPickeatWithoutRoom(
            @Valid @org.springframework.web.bind.annotation.RequestBody PickeatRequest request);


    @Operation(
            summary = "방 내부용 새 픽잇 생성",
            description = "특정 방(Room) 내에서 사용자를 위해 새로운 픽잇을 생성합니다. (로그인 필요)",
            operationId = "createPickeatInRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @RequestBody(
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
                    responseCode = "404",
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/1/pickeats"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class)
                    )
            )
    })
    ResponseEntity<PickeatResponse> createPickeatWithRoom(
            @Parameter(description = "방 ID") @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) Long userId,
            @Valid @org.springframework.web.bind.annotation.RequestBody PickeatRequest request
    );


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
            summary = "픽잇 결과 생성",
            description = "픽잇의 결과를 생성하거나 기존 결과를 반환합니다. likeCount가 가장 높은 식당들 중에서 랜덤으로 1개를 선택하여 DB에 저장합니다. 모든 식당의 likeCount가 0인 경우 전체 식당에서 랜덤 선택합니다. 멱등성을 지원하여 이미 결과가 있는 경우 기존 결과를 반환합니다.",
            operationId = "createPickeatResult",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "새로운 결과 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResultResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "200",
                    description = "기존 결과 반환",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResultResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "결과 생성 실패 (모든 식당 소거됨)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "결과 생성 불가 (모든 식당 소거됨)",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "RESTAURANTS_IS_EMPTY",
                                                      "status": 400,
                                                      "detail": "픽잇의 식당이 비어있습니다.",
                                                      "instance": "/api/v1/pickeats/ABC123/result"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<PickeatResultResponse> createPickeatResult(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode,
            @Parameter(hidden = true) ParticipantPrincipal participantPrincipal
    );

    @Operation(
            summary = "픽잇 결과 조회",
            description = "저장된 픽잇 결과를 조회합니다. 결과가 없는 경우 404 에러를 반환합니다.",
            operationId = "getPickeatResult",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "결과 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResultResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "결과 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "결과 없음",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "PICKEAT_RESULT_NOT_FOUND",
                                                      "status": 404,
                                                      "detail": "픽잇 결과를 찾을 수 없습니다.",
                                                      "instance": "/api/v1/pickeats/ABC123/result"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<PickeatResultResponse> getPickeatResult(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "픽잇 활성화 상태 조회",
            description = "픽잇의 현재 활성화 상태를 조회합니다.",
            operationId = "getPickeatState"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "픽잇 상태 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatStateResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "픽잇 없음",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "PICKEAT_NOT_FOUND",
                                                      "status": 404,
                                                      "detail": "픽잇을 찾을 수 없습니다.",
                                                      "instance": "/api/v1/pickeats/ABC123/state"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<PickeatStateResponse> getPickeatState(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode
    );

    @Operation(
            summary = "방의 활성화된 픽잇 목록 조회",
            operationId = "getActivePickeatsInRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "활성화된 픽잇 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "방에 대한 접근 권한 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방에 대한 접근 권한 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Forbidden",
                                              "status": 403,
                                              "detail": "해당 방에 대한 접근 권한이 없습니다.",
                                              "instance": "/api/v1/room/1/pickeats/active"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<PickeatResponse>> getActivePickeatsInRoom(
            @Parameter(description = "방 ID") @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) Long userId
    );

    @Operation(
            summary = "픽잇 비활성화",
            operationId = "deactivatePickeat",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "픽잇 비활성화 성공"),
            @ApiResponse(
                    responseCode = "403",
                    description = "픽잇에 대한 접근 권한 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "픽잇에 대한 접근 권한 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Forbidden",
                                              "status": 403,
                                              "detail": "해당 픽잇에 접근 권한이 없습니다.",
                                              "instance": "/api/v1/pickeats/{ABC123}/deactivate"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> deactivatePickeat(
            @PathVariable("pickeatCode") String pickeatCode,
            @Parameter(hidden = true) ParticipantPrincipal participantPrincipal
    );

    @Operation(
            summary = "사용자의 픽잇 목록 조회",
            description = "사용자가 참여하고 있는 방에서 픽잇 목록을 조회합니다. (로그인 필요)",
            operationId = "getActivePickeatsByUser",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "픽잇 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            )
    })
    ResponseEntity<List<PickeatResponse>> getPickeatsByUser(
            @Parameter(hidden = true) Long userId
    );

    @Operation(
            summary = "참여자의 픽잇 조회",
            description = "참여자가 현재 참여하고 있는 픽잇 정보를 조회합니다. (참여자 토큰 필요)",
            operationId = "getActivePickeatsByParticipant",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "픽잇 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "픽잇을 찾을 수 없음",
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
                                              "instance": "/api/v1/participant/pickeats"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<PickeatResponse> getPickeatsByParticipant(
            @Parameter(hidden = true) ParticipantPrincipal participantPrincipal
    );

    @Operation(
            summary = "비회원의 픽잇 재참여 가능 여부 조회",
            description = "비회원이 해당 픽잇에 재참여가 가능한지 여부를 반환합니다.",
            operationId = "getRejoinAvailableToPickeat",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "재참여 가능 여부 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatRejoinAvailableResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "픽잇 없음",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "PICKEAT_NOT_FOUND",
                                                      "status": 404,
                                                      "detail": "픽잇을 찾을 수 없습니다.",
                                                      "instance": "/api/v1/pickeats/ABC123/rejoin-available"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<PickeatRejoinAvailableResponse> getRejoinAvailableFromNoneUser(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode,
            @Parameter(hidden = true) ParticipantPrincipal participantPrincipal
    );

    @Operation(
            summary = "방에 있는 픽잇 조회",
            description = "방 ID를 통해 해당 방에 있는 모든 픽잇을 조회합니다.",
            operationId = "getPickeatInRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "픽잇 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PickeatResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "인증 실패",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class)
                    )
            )
    })
    ResponseEntity<List<PickeatResponse>> getPickeatInRoom(
            @Parameter(description = "방 ID") @PathVariable Long roomId,
            @Parameter(hidden = true) Long userId
    );
}
