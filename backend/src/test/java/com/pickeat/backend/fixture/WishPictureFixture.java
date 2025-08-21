package com.pickeat.backend.fixture;

import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishPicture;

public class WishPictureFixture {

    public static WishPicture create(Wish wish) {
        return new WishPicture(
                wish,
                "test_key",
                "test_downloadUrl"
        );
    }
}
