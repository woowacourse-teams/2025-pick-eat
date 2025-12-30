package com.pickeat.backend.restaurant.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RestaurantCategory {

    KOREAN("한식", "korean_restaurant"),
    WESTERN("양식", "american_restaurant"),
    CHINESE("중식", "chinese_restaurant"),
    JAPANESE("일식", "japanese_restaurant"),
    FASTFOOD("패스트푸드", "fast_food_restaurant"),
    ASIANFOOD("아시안푸드", "asian_restaurant"),
    LUNCHBOX("도시락", "meal_takeaway"),
    STREETFOOD("분식", "sandwich_shop");

    private final String koreanName;
    private final String englishName;
}
