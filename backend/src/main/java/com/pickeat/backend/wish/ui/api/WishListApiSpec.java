package com.pickeat.backend.wish.ui.api;

import com.pickeat.backend.global.auth.LoginUserId;
import com.pickeat.backend.global.auth.ParticipantId;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "위시리스트", description = "위시리스트 관련 API")
public interface WishListApiSpec {

    @Operation(
            summary = "위시리스트 생성",
            operationId = "createWishList",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "생성할 위시리스트 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WishListRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "위시리스트 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WishListResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터 (검증 실패)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "유효성 검사 실패",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Bad Request",
                                              "status": 400,
                                              "detail": "위시리스트 이름은 공백을 허용하지 않습니다.",
                                              "instance": "/api/v1/room/1/wishLists"
                                            }
                                            """
                            )
                    )
            )
    })
    @PostMapping("/room/{roomId}/wishLists")
    ResponseEntity<WishListResponse> createWishList(
            @Parameter(description = "방 ID", example = "1")
            @PathVariable("roomId") Long roomId,
            @Valid @RequestBody WishListRequest request,
            @Parameter(hidden = true) @LoginUserId Long userId
    );

    @Operation(
            summary = "위시리스트 목록 조회",
            operationId = "getWishLists"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "위시리스트 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = WishListResponse.class)))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "방을 찾을 수 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "방을 찾을 수 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Not Found",
                                              "status": 404,
                                              "detail": "방을 찾을 수 없습니다.",
                                              "instance": "/api/v1/room/1/wishLists"
                                            }
                                            """
                            )
                    )
            )
    })
    @GetMapping("/room/{roomId}/wishLists")
    ResponseEntity<List<WishListResponse>> getWishLists(
            @Parameter(description = "방 ID", example = "1")
            @PathVariable("roomId") Long roomId,
            @Parameter(hidden = true) @ParticipantId Long participantId
    );

    @Operation(
            summary = "위시리스트의 위시 조회",
            operationId = "getWishesInWishList"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "위시리스트의 위시 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = WishResponse.class)))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "위시리스트를 찾을 수 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "위시리스트를 찾을 수 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Not Found",
                                              "status": 404,
                                              "detail": "위시리스트를 찾을 수 없습니다.",
                                              "instance": "/api/v1/wishLists/1"
                                            }
                                            """
                            )
                    )
            )
    })
    @GetMapping("/wishLists/{wishListId}/wishes")
    ResponseEntity<List<WishResponse>> getWishesInWishList(
            @Parameter(description = "위시리스트 ID", example = "1")
            @PathVariable("wishListId") Long wishListId,
            @Parameter(hidden = true) @ParticipantId Long participantId
    );

    @Operation(
            summary = "공용 위시리스트 목록 조회",
            operationId = "getPublicWishLists"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "공용 위시리스트 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = WishListResponse.class)))
            )
    })
    @GetMapping("/wishLists")
    ResponseEntity<List<WishListResponse>> getPublicWishLists();
}
