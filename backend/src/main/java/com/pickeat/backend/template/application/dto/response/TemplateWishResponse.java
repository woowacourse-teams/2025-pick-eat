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

    /**
     * Creates a TemplateWishResponse DTO from a TemplateWish domain object.
     *
     * @param wish the domain TemplateWish to convert
     * @return a TemplateWishResponse containing restaurant and template details extracted from the given wish
     */
    public static TemplateWishResponse from(TemplateWish wish) {
        RestaurantInfo restaurantInfo = wish.getRestaurantInfo();
        return new TemplateWishResponse(
                wish.getId(),
                restaurantInfo.getName(),
                restaurantInfo.getFoodCategory().getName(),
                restaurantInfo.getPicture().getPictureUrl(),
                restaurantInfo.getRoadAddressName(),
                parseTags(restaurantInfo.getTags()),
                restaurantInfo.getPlaceUrl(),
                wish.getTemplate().getId()
        );
    }

    /**
     * Convert a list of TemplateWish domain objects into a list of TemplateWishResponse DTOs.
     *
     * @param wishes the list of TemplateWish objects to convert; may be null
     * @return a list of TemplateWishResponse objects; returns an empty list if {@code wishes} is null or empty
     */
    public static List<TemplateWishResponse> from(List<TemplateWish> wishes) {
        if (wishes == null) {
            return List.of();
        }
        return wishes.stream().map(TemplateWishResponse::from).toList();
    }

    /**
     * Parse a comma-separated tag string into a list of individual tag values.
     *
     * @param tags a comma-separated string of tags; may be null or blank
     * @return a list of tags with surrounding whitespace removed for each entry; empty if {@code tags} is null or blank
     */
    private static List<String> parseTags(String tags) {
        if (tags == null || tags.isBlank()) {
            return List.of();
        }
        return Arrays.stream(tags.split(","))
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .toList();
    }
}
