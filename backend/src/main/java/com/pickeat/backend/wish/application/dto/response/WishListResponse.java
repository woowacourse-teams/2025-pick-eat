package com.pickeat.backend.wish.application.dto.response;

import com.pickeat.backend.wish.domain.WishList;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "위시리스트 응답")
public record WishListResponse(
        @Schema(description = "위시리스트 ID", example = "1")
        long id,
        @Schema(description = "위시리스트 이름", example = "오늘 저녁 뭐 먹지?")
        String name,
        @Schema(description = "방 ID", example = "1")
        long roomId,
        @Schema(description = "공개 여부", example = "true")
        boolean isPublic,
        @Schema(description = "위시의 개수", example = "3")
        int wishCount
) {

    public static WishListResponse from(WishList wishList) {
        return new WishListResponse(
                wishList.getId(),
                wishList.getName(),
                wishList.getRoomId(),
                wishList.getIsPublic(),
                wishList.getWishes().size()
        );
    }

    public static List<WishListResponse> from(List<WishList> wishLists) {
        return wishLists.stream()
                .map(WishListResponse::from)
                .toList();
    }
}
