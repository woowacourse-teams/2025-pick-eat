package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;

public class WishFixture {

    public static Wish create(WishList wishList) {
        return new Wish(
                "위시",
                FoodCategory.KOREAN,
                "도로명주소",
                "태그1,태그2",
                "https://place.map.kakao.com/505348601",
                wishList
        );
    }
}
