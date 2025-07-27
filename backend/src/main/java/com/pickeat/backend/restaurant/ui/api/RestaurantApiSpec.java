package com.pickeat.backend.restaurant.ui.api;

import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "식당 관리", description = "식당 선택 및 소거 관리 API")
public interface RestaurantApiSpec {

    @Operation(
            summary = "식당 소거",
            operationId = "excludeRestaurants"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "식당 소거 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "잘못된 요청 데이터 (검증 실패)",
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
                                              "instance": "/api/v1/restaurants/exclude",
                                              "fieldErrors": {
                                                "restaurantIds": "소거할 식당 ID 목록은 없을 수 없습니다."
                                              }
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 식당",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "식당 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "RESTAURANT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "식당을 찾을 수 없습니다.",
                                              "instance": "/api/v1/restaurants/exclude"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> excludeRestaurants(@RequestBody RestaurantExcludeRequest request);

    @Operation(
            summary = "식당 좋아요",
            operationId = "likeRestaurant"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "좋아요 추가 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 식당",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "식당 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "RESTAURANT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "식당을 찾을 수 없습니다.",
                                              "instance": "/api/v1/restaurants/1/like"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> likeRestaurant(
            @Parameter(description = "식당 ID")
            @PathVariable("restaurantId") Long restaurantId
    );

    @Operation(
            summary = "식당 좋아요 취소",
            operationId = "cancelLikeRestaurant"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "좋아요 취소 성공"),
            @ApiResponse(
                    responseCode = "400",
                    description = "이미 좋아요를 취소한 상태",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "이미 취소됨",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "LIKE_ALREADY_CANCELED",
                                              "status": 400,
                                              "detail": "이미 좋아요를 취소한 상태입니다.",
                                              "instance": "/api/v1/restaurants/1/unlike"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 식당",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class),
                            examples = @ExampleObject(
                                    name = "식당 없음",
                                    value = """
                                            {
                                              "type": "about:blank",
                                              "title": "RESTAURANT_NOT_FOUND",
                                              "status": 404,
                                              "detail": "식당을 찾을 수 없습니다.",
                                              "instance": "/api/v1/restaurants/1/unlike"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<Void> cancelLikeRestaurant(
            @Parameter(description = "식당 ID")
            @PathVariable("restaurantId") Long restaurantId
    );
}
