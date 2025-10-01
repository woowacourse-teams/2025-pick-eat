package com.pickeat.backend.tobe.wish.application.dto.response;

import com.pickeat.backend.tobe.wish.domain.WishPicture;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "위시 사진 응답")
public record WishPictureResponse(
        @Schema(description = "위시 사진 ID", example = "1")
        long id,
        @Schema(description = "위시 ID", example = "1")
        long wishId,
        @Schema(description = "이미지 다운로드 URL", example = "https://example.com/image.jpg")
        String imageDownloadUrl
) {

    public static WishPictureResponse from(WishPicture wishPicture) {
        return new WishPictureResponse(
                wishPicture.getId(),
                wishPicture.getWish().getId(),
                wishPicture.getDownloadUrl()
        );
    }

    public static List<WishPictureResponse> from(List<WishPicture> wishPictures) {
        return wishPictures.stream()
                .map(WishPictureResponse::from)
                .toList();
    }
}
