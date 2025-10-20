package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.List;

public record PickeatResultResponse(
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

        @Schema(description = "사진 url들")
        List<String> pictureUrls,

        @Schema(description = "식당 타입", example = "WISH / LOCATION")
        RestaurantType type
) {

    public static PickeatResultResponse from(Restaurant restaurant) {
        return new PickeatResultResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getFoodCategory().getName(),
                parseTags(restaurant.getTags()),
                restaurant.getDistance(),
                restaurant.getPlaceUrl(),
                restaurant.getRoadAddressName(),
                restaurant.getLikeCount(),
                parsePictureUrls(restaurant.getPictureUrls()),
                restaurant.getType()
        );
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
