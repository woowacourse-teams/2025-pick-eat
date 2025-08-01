package com.pickeat.backend.wish.application.dto.response;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.wish.domain.Wish;
import java.util.Arrays;
import java.util.List;

public record WishResponse(
        Long id,
        String name,
        FoodCategory category,
        List<String> pictureUrl,
        String roadAddressName,
        List<String> tags,
        Long wishListId
) {

    public static WishResponse from(Wish wish) {
        return new WishResponse(
                wish.getId(),
                wish.getName(),
                wish.getFoodCategory(),
                List.of(),
                wish.getRoadAddressName(),
                Arrays.stream(wish.getTags().split(",")).toList(),
                wish.getWishList().getId()
        );
    }

    public static List<WishResponse> from(List<Wish> wishes) {
        return wishes.stream().map(WishResponse::from).toList();
    }
}
