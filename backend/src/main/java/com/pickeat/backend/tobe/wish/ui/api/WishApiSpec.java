package com.pickeat.backend.tobe.wish.ui.api;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "위시", description = "위시 관련 API")
public interface WishApiSpec {

    @Operation(
            summary = "위시 생성",
            description = "특정 룸에 위시를 생성합니다.",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "위시 생성 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = WishResponse.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "VALIDATION_FAILED",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "VALIDATION_FAILED",
                                              "status": 400,
                                              "detail": "입력 데이터 검증에 실패했습니다.",
                                              "instance": "/api/v1/rooms/1/wishes",
                                              "fieldErrors": {
                                                "restaurantName": "가게 이름은 공백일 수 없습니다."
                                              }
                                            }
                                            """))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "UNAUTHORIZED",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "UNAUTHORIZED",
                                                "status": 401,
                                                "detail": "인증 정보가 유효하지 않습니다.",
                                                "instance": "/api/v1/rooms/1/wishes"
                                            }
                                            """))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 룸",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "ROOM_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "ROOM_NOT_FOUND",
                                                "status": 404,
                                                "detail": "방을 찾을 수 없습니다.",
                                                "instance": "/api/v1/rooms/1/wishes"
                                            }
                                            """)))
    })
    @PostMapping("/rooms/{roomId}/wishes")
    ResponseEntity<WishResponse> createWish(
            @Parameter(description = "룸 ID") @PathVariable("roomId") Long roomId,
            @Valid @RequestBody WishRequest request,
            @Parameter(hidden = true) @LoginUserId Long userId);

    @Operation(
            summary = "위시 삭제",
            description = "특정 위시를 삭제합니다.",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "위시 삭제 성공"),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "UNAUTHORIZED",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "UNAUTHORIZED",
                                                "status": 401,
                                                "detail": "인증 정보가 유효하지 않습니다.",
                                                "instance": "/api/v1/wishes/1"
                                            }
                                            """))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 위시",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "WISH_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "WISH_NOT_FOUND",
                                                "status": 404,
                                                "detail": "위시를 찾을 수 없습니다.",
                                                "instance": "/api/v1/wishes/1"
                                            }
                                            """)))
    })
    @DeleteMapping("/wishes/{wishId}")
    ResponseEntity<Void> deleteWish(
            @Parameter(description = "삭제할 위시 ID") @PathVariable("wishId") Long wishId,
            @Parameter(hidden = true) @LoginUserId Long userId);

    @Operation(
            summary = "룸의 위시 목록 조회",
            description = "특정 룸에 속한 위시 목록을 조회합니다.",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = WishResponse[].class))),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "UNAUTHORIZED",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "UNAUTHORIZED",
                                                "status": 401,
                                                "detail": "인증 정보가 유효하지 않습니다.",
                                                "instance": "/api/v1/rooms/1/wishes"
                                            }
                                            """))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 룸",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(name = "ROOM_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "ROOM_NOT_FOUND",
                                                "status": 404,
                                                "detail": "방을 찾을 수 없습니다.",
                                                "instance": "/api/v1/rooms/1/wishes"
                                            }
                                            """)))
    })
    @GetMapping("/rooms/{roomId}/wishes")
    ResponseEntity<List<WishResponse>> getWishesInRoom(
            @Parameter(description = "룸 ID") @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) @LoginUserId Long loginUserId);
}
