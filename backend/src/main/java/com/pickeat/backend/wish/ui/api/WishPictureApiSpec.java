package com.pickeat.backend.wish.ui.api;

import com.pickeat.backend.global.auth.LoginUserId;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "위시 사진", description = "위시 사진 관련 API")
public interface WishPictureApiSpec {

    @Operation(
            summary = "위시 사진 생성",
            operationId = "createWishPictures"
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
                            schema = @Schema(implementation = org.springframework.http.ProblemDetail.class),
                            examples = @io.swagger.v3.oas.annotations.media.ExampleObject(
                                    name = "부적절한 이미지 타입",
                                    value = "{\"type\":\"about:blank\",\"title\":\"Bad Request\",\"status\":400,\"detail\":\"이미지 파일만 업로드할 수 있습니다.\",\"instance\":\"/api/v1/wish/1/wishpictures\"}"
                            )
                    )
            )
    })
    @PostMapping(value = "/wish/{wishId}/wishpictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<List<WishPictureResponse>> createWishPictures(
            @Parameter(description = "위시 ID", example = "1")
            @PathVariable("wishId") Long wishId,
            @Parameter(description = "위시 사진 목록")
            @RequestPart("wishPictures") @NotEmpty List<MultipartFile> wishPictures,
            @Parameter(hidden = true) @LoginUserId Long userId
    );
}
