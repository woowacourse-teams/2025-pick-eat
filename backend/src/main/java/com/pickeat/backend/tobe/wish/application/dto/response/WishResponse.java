package com.pickeat.backend.tobe.wish.application.dto.response;

import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.tobe.wish.domain.Wish;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.List;

@Schema(description = "위시 응답")
public record WishResponse(
        @Schema(description = "위시 ID", example = "1")
        Long id,
        @Schema(description = "위시 이름", example = "맛있는 떡볶이")
        String name,
        @Schema(description = "카테고리", example = "한식")
        String category,
        @Schema(description = "위시 이미지", example = """
                {
                  "wishId": 1,
                  "imageDownloadUrl": "https://example.com/image1.jpg"
                }
                """)
        WishPictureResponse picture,
        @Schema(description = "도로명 주소", example = "서울특별시 강남구 테헤란로 123")
        String roadAddressName,
        @Schema(description = "태그 목록", example = "[\"매운맛\", \"치즈추가\"]")
        List<String> tags,
        @Schema(description = "식당 정보 Url", example = "www.restaurant.com")
        String placeUrl
) {

    public static WishResponse from(Wish wish) {
        RestaurantInfo restaurantInfo = wish.getRestaurantInfo();
        return new WishResponse(
                wish.getId(),
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory().getName(),
                restaurantInfo.getPicture() == null ? null : WishPictureResponse.from(wish),
                restaurantInfo.getRoadAddressName(),
                parseTags(restaurantInfo.getTags()),
                restaurantInfo.getPlaceUrl()
        );
    }

    public static List<WishResponse> from(List<Wish> wishes) {
        return wishes.stream().map(WishResponse::from).toList();
    }

    private static List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(tags.split(",")).toList();
    }
}
