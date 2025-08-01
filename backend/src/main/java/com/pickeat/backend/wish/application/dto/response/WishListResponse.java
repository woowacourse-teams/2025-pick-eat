package com.pickeat.backend.wish.application.dto.response;

import com.pickeat.backend.wish.domain.WishList;
import java.util.List;

public record WishListResponse(
        long id,
        String name,
        long roomId,
        boolean isPublic
) {

    public static WishListResponse from(WishList wishList) {
        return new WishListResponse(
                wishList.getId(),
                wishList.getName(),
                wishList.getRoomId(),
                wishList.isPublic()
        );
    }

    public static List<WishListResponse> from(List<WishList> wishLists) {
        return wishLists.stream()
                .map(WishListResponse::from)
                .toList();
    }
}
