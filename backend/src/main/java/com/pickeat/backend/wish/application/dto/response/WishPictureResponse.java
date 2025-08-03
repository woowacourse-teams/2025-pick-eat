package com.pickeat.backend.wish.application.dto.response;

import com.pickeat.backend.wish.domain.WishPicture;
import java.util.List;

public record WishPictureResponse(
        long id,
        long wishId,
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
