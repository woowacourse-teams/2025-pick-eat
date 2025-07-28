package com.pickeat.backend.restaurant.application.dto.response;

import com.pickeat.backend.restaurant.domain.Restaurant;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "식당 응답")
public record RestaurantResponse(
        @Schema(description = "식당 ID", example = "1")
        long id,

        @Schema(description = "식당 이름", example = "맛있는 한식당")
        String name,

        @Schema(description = "음식 카테고리", example = "한식")
        String category,

        @Schema(description = "중심지로부터의 거리 (미터)", example = "150")
        int distance,

        @Schema(description = "카카오맵 장소 URL", example = "https://place.map.kakao.com/12345")
        String placeUrl,

        @Schema(description = "도로명 주소", example = "서울 강남구 테헤란로 123")
        String roadAddressName,

        @Schema(description = "좋아요 수", example = "3")
        int likeCount,

        @Schema(description = "소거 여부", example = "false")
        boolean isExcluded,

        @Schema(description = "식당 위치의 x 좌표 (경도)", example = "37.5670")
        double x,

        @Schema(description = "식당 위치의 y 좌표 (위도)", example = "126.9785")
        double y
) {

    public static RestaurantResponse from(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getFoodCategory().getName(),
                restaurant.getDistance(),
                restaurant.getPlaceUrl(),
                restaurant.getRoadAddressName(),
                restaurant.getLikeCount(),
                restaurant.getIsExcluded(),
                restaurant.getLocation().getX(),
                restaurant.getLocation().getY());
    }

    public static List<RestaurantResponse> from(List<Restaurant> restaurants) {
        return restaurants.stream()
                .map(RestaurantResponse::from)
                .toList();
    }
}
