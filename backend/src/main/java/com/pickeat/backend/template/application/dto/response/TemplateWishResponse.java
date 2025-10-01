package com.pickeat.backend.template.application.dto.response;

import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.template.domain.TemplateWish;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Arrays;
import java.util.List;

@Schema(description = "탬플릿 위시 응답")
public record TemplateWishResponse(
        @Schema(description = "위시 ID", example = "1")
        long id,
        @Schema(description = "위시 이름", example = "맛있는 떡볶이")
        String name,
        @Schema(description = "카테고리", example = "한식")
        String category,
        @Schema(description = "위시 이미지", example = "https://example.com/image1.jpg")
        String pictureUrl,
        @Schema(description = "도로명 주소", example = "서울특별시 강남구 테헤란로 123")
        String roadAddressName,
        @Schema(description = "태그 목록", example = "[\"매운맛\", \"치즈추가\"]")
        List<String> tags,
        @Schema(description = "식당 정보 Url", example = "www.restaurant.com")
        String placeUrl,
        @Schema(description = "탬플릿 ID", example = "1")
        long templateId
) {

    public static TemplateWishResponse from(TemplateWish wish) {
        RestaurantInfo restaurantInfo = wish.getRestaurantInfo();
        return new TemplateWishResponse(
                wish.getId(),
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory().getName(),
                restaurantInfo.getPicture().getDownloadUrl(),
                restaurantInfo.getRoadAddressName(),
                parseTags(restaurantInfo.getTags()),
                restaurantInfo.getPlaceUrl(),
                wish.getTemplate().getId()
        );
    }

    public static List<TemplateWishResponse> from(List<TemplateWish> wishes) {
        return wishes.stream().map(TemplateWishResponse::from).toList();
    }

    private static List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(tags.split(",")).toList();
    }
}
