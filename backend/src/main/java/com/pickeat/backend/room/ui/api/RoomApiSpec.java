package com.pickeat.backend.room.ui.api;

import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
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

@Tag(name = "방 관리", description = "방 생성, 조회 및 초대 API")
public interface RoomApiSpec {

    @Operation(
            summary = "새 방 생성",
            operationId = "createRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @RequestBody(
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
                            examples = @ExampleObject(
                                    name = "@Valid 검증 실패",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "입력 데이터 검증에 실패했습니다.",
                                              "instance": "/api/v1/rooms",
                                              "fieldErrors": {
                                                "name": "방 이름은 공백일 수 없습니다."
                                              }
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<RoomResponse> create(
            @Valid @org.springframework.web.bind.annotation.RequestBody RoomRequest request,
            @Parameter(hidden = true) Long userId);

    @Operation(
            summary = "방 정보 조회",
            operationId = "getRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
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
                                              "instance": "/api/v1/rooms/1"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<RoomResponse> get(
            @Parameter(description = "방 ID")
            @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) Long userId
    );

    @Operation(
            summary = "사용자가 속한 모든 방 조회",
            operationId = "getAllRoomsForUser",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "방 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RoomResponse[].class)
                    )
            )
    })
    ResponseEntity<List<RoomResponse>> getAll(@Parameter(hidden = true) Long userId);

    @Operation(
            summary = "방에 사용자 초대",
            operationId = "inviteToRoom",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RoomInvitationRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용자 초대 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 방 또는 존재하지 않는 사용자",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = {
                                    @ExampleObject(
                                            name = "방 없음",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "ROOM_NOT_FOUND",
                                                      "status": 404,
                                                      "detail": "방을 찾을 수 없습니다.",
                                                      "instance": "/api/v1/rooms/1/invite"
                                                    }
                                                    """
                                    ),
                                    @ExampleObject(
                                            name = "사용자 없음",
                                            value = """
                                                    {
                                                      "type": "about:blank",
                                                      "title": "USER_NOT_FOUND",
                                                      "status": 404,
                                                      "detail": "초대할 사용자를 찾을 수 없습니다.",
                                                      "instance": "/api/v1/rooms/1/invite"
                                                    }
                                                    """
                                    )
                            }
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터 (초대된 사용자 정보 누락 등)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "검증 실패",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "입력 데이터 검증에 실패했습니다.",
                                              "instance": "/api/v1/rooms/1/invite",
                                              "fieldErrors": {
                                                "userIds": "초대할 사용자 ID 목록은 비어 있을 수 없습니다."
                                              }
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> invite(
            @Parameter(description = "방 ID")
            @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) Long userId,
            @Valid @org.springframework.web.bind.annotation.RequestBody RoomInvitationRequest request
    );

    @Operation(
            summary = "방 나가기",
            description = "로그인한 사용자가 지정한 방에서 탈퇴합니다.",
            tags = {"Room"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "방 나가기 성공 (본문 없음)"
            ),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
    })
    ResponseEntity<Void> exit(
            @Parameter(description = "방 ID")
            @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) Long userId
    );
}
