package com.pickeat.backend.tobe.wish.application.dto.response;

import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.tobe.wish.domain.Wish;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "위시 사진 응답", name = "WishPictureResponseV2")
public record WishPictureResponse(
        @Schema(description = "위시 ID", example = "1")
        long wishId,
        @Schema(description = "이미지 다운로드 URL", example = "https://example.com/image.jpg")
        String imageDownloadUrl
) {

    public static WishPictureResponse from(Wish wish) {
        Picture picture = wish.getRestaurantInfo().getPicture();
        return new WishPictureResponse(wish.getId(), picture.getPictureUrl());
    }
}
