package com.pickeat.backend.fixture;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.TemplateWish;

public class TemplateWishFixture {

    /**
     * Create a TemplateWish populated with sample RestaurantInfo.
     *
     * @param template the Template to associate with the generated TemplateWish
     * @return a TemplateWish containing a RestaurantInfo pre-filled with sample data and the provided template
     */
    public static TemplateWish create(Template template) {
        RestaurantInfo restaurantInfo = new RestaurantInfo(
                "식당",
                FoodCategory.KOREAN,
                10,
                "도로명 주소",
                "URL",
                "태그1,태그2",
                new Picture("key", "https://place.map.kakao.com/505348601")
        );
        return new TemplateWish(
                restaurantInfo,
                template
        );
    }
}
