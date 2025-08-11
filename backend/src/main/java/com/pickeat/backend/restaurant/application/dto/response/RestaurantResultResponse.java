package com.pickeat.backend.restaurant.application.dto.response;

import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.List;

public record RestaurantResultResponse(
        @Schema(description = "식당 ID", example = "1")
        long id,

        @Schema(description = "식당 이름", example = "맛있는 한식당")
        String name,

        @Schema(description = "음식 카테고리", example = "한식")
        String category,

        @Schema(description = "식당 태그", example = "해물, 생선")
        List<String> tags,

        @Schema(description = "중심지로부터의 거리 (미터)", example = "150")
        Integer distance,

        @Schema(description = "장소 URL", example = "https://place.map.kakao.com/12345")
        String placeUrl,

        @Schema(description = "도로명 주소", example = "서울 강남구 테헤란로 123")
        String roadAddressName,

        @Schema(description = "좋아요 수", example = "3")
        int likeCount,

        @Schema(description = "식당 위치의 x 좌표 (경도)", example = "37.5670")
        Double x,

        @Schema(description = "식당 위치의 y 좌표 (위도)", example = "126.9785")
        Double y,

        @Schema(description = "사진 url들")
        List<String> pictureUrls,

        @Schema(description = "식당 타입", example = "WISH / LOCATION")
        RestaurantType type,

        @Schema(description = "동점 여부", example = "true")
        boolean isTied
) {

    public static RestaurantResultResponse from(Restaurant restaurant, boolean isTied) {
        return new RestaurantResultResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getFoodCategory().getName(),
                parseTags(restaurant.getTags()),
                restaurant.getDistance(),
                restaurant.getPlaceUrl(),
                restaurant.getRoadAddressName(),
                restaurant.getLikeCount(),
                getLocationX(restaurant),
                getLocationY(restaurant),
                parsePictureUrls(restaurant.getPictureUrls()),
                restaurant.getType(),
                isTied);
    }


    private static Double getLocationX(Restaurant restaurant) {
        if (restaurant.getLocation() != null) {
            return restaurant.getLocation().getX();
        }

        return null;
    }

    private static Double getLocationY(Restaurant restaurant) {
        if (restaurant.getLocation() != null) {
            return restaurant.getLocation().getY();
        }

        return null;
    }

    private static List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(tags.split(","))
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .toList();
    }

    private static List<String> parsePictureUrls(String urls) {
        if (urls == null || urls.isBlank()) {
            return List.of();
        }
        return Arrays.stream(urls.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
