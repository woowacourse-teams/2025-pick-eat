package com.pickeat.backend.wish.application.dto.response;

import com.pickeat.backend.wish.domain.Wish;
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
                [
                  {
                    "id": 1,
                    "wishId": 1,
                    "imageDownloadUrl": "https://example.com/image1.jpg"
                  },
                  {
                    "id": 2,
                    "wishId": 1,
                    "imageDownloadUrl": "https://example.com/image2.jpg"
                  }
                ]
                """)
        List<WishPictureResponse> pictures,
        @Schema(description = "도로명 주소", example = "서울특별시 강남구 테헤란로 123")
        String roadAddressName,
        @Schema(description = "태그 목록", example = "[\"매운맛\", \"치즈추가\"]")
        List<String> tags,
        @Schema(description = "위시리스트 ID", example = "1")
        Long wishListId
) {

    public static WishResponse from(Wish wish) {
        List<WishPictureResponse> wishPictureResponses = WishPictureResponse.from(wish.getWishPictures());
        return new WishResponse(
                wish.getId(),
                wish.getName(),
                wish.getFoodCategory().getName(),
                wishPictureResponses,
                wish.getRoadAddressName(),
                Arrays.stream(wish.getTags().split(",")).toList(),
                wish.getWishList().getId()
        );
    }

    public static List<WishResponse> from(List<Wish> wishes) {
        return wishes.stream().map(WishResponse::from).toList();
    }
}
