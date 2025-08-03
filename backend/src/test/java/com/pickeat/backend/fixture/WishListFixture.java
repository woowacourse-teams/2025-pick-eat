package com.pickeat.backend.fixture;

import com.pickeat.backend.wish.domain.WishList;

public class WishListFixture {

    public static WishList createPrivate(Long roomId) {
        return new WishList(
                "위시리스트",
                roomId,
                false
        );
    }

    public static WishList createPublic(Long roomId) {
        return new WishList(
                "위시리스트",
                roomId,
                true
        );
    }
}
