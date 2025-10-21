package com.pickeat.backend.tobe.user.ui.api;

import com.pickeat.backend.tobe.user.application.dto.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "사용자 관리", description = "사용자 정보 조회 및 관리 API")
public interface UserApiSpec {

    @Operation(
            summary = "내 정보 조회",
            description = "로그인된 사용자의 정보를 조회합니다. (로그인 필요)",
            operationId = "getMyInfo",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "내 정보 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "인증되지 않은 사용자",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "UNAUTHORIZED",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "UNAUTHORIZED",
                                                "status": 401,
                                                "detail": "인증 정보가 유효하지 않습니다.",
                                                "instance": "/api/v1/users/me"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "USER_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "USER_NOT_FOUND",
                                                "status": 404,
                                                "detail": "사용자를 찾을 수 없습니다.",
                                                "instance": "/api/v1/users/me"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<UserResponse> getUser(@Parameter(hidden = true) Long userId);

    @Operation(
            summary = "방 참여 사용자 목록 조회",
            description = "특정 방(Room)에 참여하고 있는 모든 사용자의 목록을 조회합니다.",
            operationId = "getRoomUsers"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "사용자 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse[].class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 방",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "ROOM_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "ROOM_NOT_FOUND",
                                                "status": 404,
                                                "detail": "방을 찾을 수 없습니다.",
                                                "instance": "/api/v1/rooms/1/users"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<UserResponse>> getRoomUsers(
            @Parameter(description = "방 ID") @PathVariable("roomId") Long roomId);

    @Operation(
            summary = "닉네임으로 사용자 검색",
            description = "닉네임으로 사용자를 검색하여 일치하는 사용자 목록을 반환합니다.",
            operationId = "searchUsersByNickname"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "사용자 검색 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse[].class)
                    )
            )
    })
    ResponseEntity<List<UserResponse>> getUsers(@Parameter(description = "검색할 닉네임") @RequestParam String nickname);
}
