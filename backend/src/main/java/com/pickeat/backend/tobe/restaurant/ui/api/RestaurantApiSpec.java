package com.pickeat.backend.tobe.restaurant.ui.api;

import com.pickeat.backend.tobe.restaurant.application.request.WishRestaurantRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name = "식당 관리", description = "식당 선택 및 관리 API")
public interface RestaurantApiSpec {

    String 픽잇_코드_UUID_형식 = "픽잇 코드 (UUID 형식)";

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
}
