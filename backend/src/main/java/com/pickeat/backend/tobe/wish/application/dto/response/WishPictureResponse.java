package com.pickeat.backend.tobe.wish.application.dto.response;

import com.pickeat.backend.tobe.wish.domain.Wish;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "위시 사진 응답")
public record WishPictureResponse(
        @Schema(description = "위시 ID", example = "1")
        long wishId,
        @Schema(description = "이미지 다운로드 URL", example = "https://example.com/image.jpg")
        String imageDownloadUrl
) {

    public static WishPictureResponse from(Wish wish) {
        return new WishPictureResponse(
                wish.getId(),
                wish.getRestaurantInfo().getPicture().getPictureUrl()
        );
    }

    public static List<WishPictureResponse> from(List<Wish> wishes) {
        return wishes.stream()
                .map(WishPictureResponse::from)
                .toList();
    }
}
