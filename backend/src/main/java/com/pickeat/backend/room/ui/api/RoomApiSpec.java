package com.pickeat.backend.room.ui.api;

import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
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

@Tag(name = "방 관리", description = "식당 선택 방 관리 API")
public interface RoomApiSpec {

    String 방_코드_UUID_형식 = "방 코드 (UUID 형식)";

    @Operation(
            summary = "새 방 생성",
            operationId = "createRoom",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "방 생성 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RoomRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "방 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class)
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
                                                      "instance": "/api/v1/rooms",
                                                      "fieldErrors": {
                                                        "name": "방이름은 공백으로 입력할 수 없습니다.",
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
                                                      "instance": "/api/v1/rooms"
                                                    }
                                                    """
                                    )
                            }
                    )
            )
    })
    ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest request);

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
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/ABC123/participants/state"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<ParticipantStateResponse> getParticipantStateSummary(
            @Parameter(description = 방_코드_UUID_형식)
            @PathVariable("roomCode") String roomCode
    );

    @Operation(
            summary = "방 비활성화",
            operationId = "deactivateRoom"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "방 비활성화 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/ABC123/deactivate"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 비활성화된 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "이미 비활성화됨",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_ALREADY_INACTIVE",
                                              "status": 400,
                                              "detail": "이미 비활성화된 방입니다.",
                                              "instance": "/api/v1/rooms/ABC123/deactivate"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> deactivateRoom(
            @Parameter(description = 방_코드_UUID_형식)
            @PathVariable("roomCode") String roomCode
    );

    @Operation(
            summary = "방 정보 조회",
            operationId = "getRoom"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "방 정보 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/ABC123"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<RoomResponse> getRoom(
            @Parameter(description = 방_코드_UUID_형식)
            @PathVariable("roomCode") String roomCode
    );

    @Operation(
            summary = "방 결과 조회",
            operationId = "getRoomResult"
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
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/ABC123/result"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<RestaurantResponse>> getRoomResult(
            @Parameter(description = 방_코드_UUID_형식)
            @PathVariable("roomCode") String roomCode
    );

    @Operation(
            summary = "방 식당 목록 조회",
            operationId = "getRoomRestaurants"
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
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "ROOM_NOT_FOUND",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/rooms/ABC123/restaurants"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<RestaurantResponse>> getRoomRestaurants(
            @Parameter(description = 방_코드_UUID_형식)
            @PathVariable("roomCode") String roomCode,

            @Parameter(description = "소거 여부 필터 ( --: 전체 식당 조회, true: 소거된 식당만, false: 소거되지 않은 식당만)")
            @RequestParam(required = false) Boolean isExcluded
    );
}
