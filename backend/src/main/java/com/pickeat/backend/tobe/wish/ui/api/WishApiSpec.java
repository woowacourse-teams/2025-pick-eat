package com.pickeat.backend.tobe.wish.ui.api;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
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
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "위시", description = "위시 관련 API")
public interface WishApiSpec {

    @Operation(
            summary = "위시 생성",
            operationId = "createWish",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "생성할 위시 정보",
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WishRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "위시 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WishResponse.class)
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
                                              "detail": "위시 이름은 공백을 허용하지 않습니다.",
                                              "instance": "/api/v1/wishLists/1/wishes"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<WishResponse> createWish(
            @Parameter(description = "위시리스트 ID", example = "1")
            @PathVariable("wishListId") Long wishListId,
            @Valid @RequestBody WishRequest request,
            @Parameter(hidden = true) @LoginUserId Long userId
    );

    @Operation(
            summary = "위시 삭제",
            operationId = "deleteWish",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "위시 삭제 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "위시를 찾을 수 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "위시를 찾을 수 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Not Found",
                                              "status": 404,
                                              "detail": "위시를 찾을 수 없습니다.",
                                              "instance": "/api/v1/wishes/1"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> deleteWish(
            @Parameter(description = "위시 ID", example = "1")
            @PathVariable("wishId") Long wishId,
            @Parameter(hidden = true) @LoginUserId Long userId
    );

    @Operation(
            summary = "위시리스트의 위시 조회",
            operationId = "getWishesInWishList",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
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
    ResponseEntity<List<WishResponse>> getWishesInWishList(
            @Parameter(description = "위시리스트 ID", example = "1")
            @PathVariable("wishListId") Long wishListId,
            @Parameter(hidden = true) @LoginUserId Long userId
    );

    @Operation(
            summary = "공개 위시리스트의 위시 조회",
            operationId = "getWishesInPublicWishList"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "공개 위시리스트의 위시 조회 성공",
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
                                              "instance": "/api/v1/wishLists/public/1/wishes"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<WishResponse>> getWishesInTemplates(
            @Parameter(description = "공개 위시리스트 ID", example = "1")
            @PathVariable("wishListId") Long wishListId
    );

    @Operation(
            summary = "위시 수정",
            operationId = "updateWish",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth"),
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "수정할 위시 정보",
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = WishUpdateRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "위시 수정 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WishResponse.class)
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
                                              "detail": "비어있는 위시 이름은 허용하지 않습니다.",
                                              "instance": "/api/v1/wishes/1"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "위시를 찾을 수 없음",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "위시를 찾을 수 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "Not Found",
                                              "status": 404,
                                              "detail": "위시를 찾을 수 없습니다.",
                                              "instance": "/api/v1/wishes/1"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<WishResponse> updateWish(
            @Parameter(description = "위시 ID", example = "1")
            @PathVariable("wishId") Long wishId,
            @Valid @RequestBody WishUpdateRequest request,
            @Parameter(hidden = true) @LoginUserId Long userId
    );
}
