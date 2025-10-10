package com.pickeat.backend.tobe.restaurant.ui.api;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.tobe.restaurant.application.dto.request.TemplateRestaurantRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
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
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = "식당 관리 V2", description = "식당 선택 및 관리 API")
public interface RestaurantApiSpec {

    String 픽잇_코드_UUID_형식 = "픽잇 코드 (UUID 형식)";

    @Operation(
            summary = "위치 기반 식당 목록 생성",
            description = "사용자의 현재 위치를 기반으로 주변 식당 목록을 생성하여 픽잇에 추가합니다.",
            operationId = "createRestaurantsByLocation",
            requestBody = @RequestBody(
                    description = "위치 정보 및 카테고리",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LocationRestaurantRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "식당 목록 생성 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class)
                    )
            )
    })
    ResponseEntity<Void> createRestaurantsByLocation(
            @Parameter(description = 픽잇_코드_UUID_형식) @PathVariable("pickeatCode") String pickeatCode,
            @Valid @org.springframework.web.bind.annotation.RequestBody LocationRestaurantRequest request);

    @Operation(
            summary = "위시 목록 기반 식당 목록 생성",
            description = "사용자의 위 목록에 있는 식당들을 기반으로 식당 목록을 생성하여 픽잇에 추가합니다.",
            operationId = "createRestaurantsByWish",
            requestBody = @RequestBody(
                    description = "위 목록 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "식당 목록 생성 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇 또는 위시 목록",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class)
                    )
            )
    })
    ResponseEntity<Void> createRestaurantsByWish(
            @Parameter(description = 픽잇_코드_UUID_형식) @PathVariable("pickeatCode") String pickeatCode,
            @Valid @RequestBody WishRestaurantRequest request);

    @Operation(
            summary = "템플릿 기반 식당 목록 생성",
            description = "템플릿을 기반으로 식당 목록을 생성하여 픽잇에 추가합니다.",
            operationId = "createRestaurantsByTemplate",
            requestBody = @RequestBody(
                    description = "템플릿으로 식당 목록을 생성하기 위한 요청 정보",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TemplateRestaurantRequest.class)
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "식당 목록 생성 성공"),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 픽잇",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class)
                    )
            )
    })
    ResponseEntity<Void> createRestaurantsByTemplate(
            @Parameter(description = 픽잇_코드_UUID_형식) @PathVariable("pickeatCode") String pickeatCode,
            @Valid @org.springframework.web.bind.annotation.RequestBody TemplateRestaurantRequest request);

    @Operation(
            summary = "식당 소거",
            operationId = "excludeRestaurants",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth"),
            requestBody = @RequestBody(
                    description = "소거할 식당 ID 목록",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RestaurantExcludeRequest.class)
                    )
            )
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
    ResponseEntity<Void> excludeRestaurants(
            @org.springframework.web.bind.annotation.RequestBody RestaurantExcludeRequest request,
            @Parameter(hidden = true) Long participantId);

    @Operation(
            summary = "식당 좋아요",
            operationId = "likeRestaurant",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
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
            @PathVariable("restaurantId") Long restaurantId,
            @Parameter(hidden = true) Long participantId
    );

    @Operation(
            summary = "식당 좋아요 취소",
            operationId = "cancelLikeRestaurant",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
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
            @PathVariable("restaurantId") Long restaurantId,
            @Parameter(hidden = true) Long participantId
    );

    @Operation(
            summary = "픽잇 식당 목록 조회",
            operationId = "getPickeatRestaurants",
            security = @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "ParticipantAuth")
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
                                              "instance": "/api/v1/pickeats/ABC123/restaurants"
                                            }
                                            """
                            )
                    )
            )
    })
    ResponseEntity<List<RestaurantResponse>> getPickeatRestaurants(
            @Parameter(description = 픽잇_코드_UUID_형식)
            @PathVariable("pickeatCode") String pickeatCode,

            @Parameter(description = "소거 여부 필터 ( --: 전체 식당 조회, true: 소거된 식당만, false: 소거되지 않은 식당만)")
            @RequestParam(required = false) Boolean isExcluded,
            @Parameter(hidden = true) Long participantId
    );
}
