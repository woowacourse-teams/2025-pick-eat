package com.pickeat.backend.tobe.wish.ui.api;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.tobe.wish.application.dto.response.WishPictureResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "위시", description = "위시 관련 API")
public interface WishPictureApiSpec {

    @Operation(
            summary = "위시 사진 생성",
            operationId = "createWishPictures",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "위시 사진 생성 성공",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = WishPictureResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터 (부적절한 이미지 타입)",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "INVALID_IMAGE_TYPE",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "INVALID_IMAGE_TYPE",
                                              "status": 400,
                                              "detail": "이미지 파일만 업로드할 수 있습니다.",
                                              "instance": "/api/v1/wish/1/wishpictures"
                                            }
                                            """
                            )
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
                                                "instance": "/api/v1/wish/1/wishpictures"
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
                                    name = "WISH_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "WISH_NOT_FOUND",
                                                "status": 404,
                                                "detail": "위시를 찾을 수 없습니다.",
                                                "instance": "/api/v1/wish/1/wishpictures"
                                            }
                                            """
                            )
                    )
            )
    })
    @PostMapping(value = "/wish/{wishId}/wishpictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<WishPictureResponse> createWishPictures(
            @Parameter(description = "위시 ID", example = "1") @PathVariable("wishId") Long wishId,
            @Parameter(description = "위시 사진 목록") @RequestPart("wishPictures") @NotNull MultipartFile wishPictures,
            @Parameter(hidden = true) @LoginUserId Long userId
    );

    @Operation(
            summary = "위시 사진 삭제",
            operationId = "deleteWishPictures",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "UserAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "위시 사진 삭제 성공"),
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
                                                "instance": "/api/v1/wish/1/wishpictures"
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
                                    name = "WISH_NOT_FOUND",
                                    value = """
                                            {
                                                "type": "about:blank",
                                                "title": "WISH_NOT_FOUND",
                                                "status": 404,
                                                "detail": "위시를 찾을 수 없습니다.",
                                                "instance": "/api/v1/wish/1/wishpictures"
                                            }
                                            """
                            )
                    )
            )
    })
    @DeleteMapping("/wish/{wishId}/wishpictures")
    ResponseEntity<Void> deleteWishPictures(
            @Parameter(description = "위시 ID", example = "1") @PathVariable("wishId") Long wishId,
            @Parameter(hidden = true) @LoginUserId Long userId
    );
}

