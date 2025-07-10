package com.pickeat.backend.menu.application.dto.response;

import com.pickeat.backend.menu.domain.MenuCategory;
import java.util.List;

public record MenuCategoryResponse(
        Long id,
        String name
) {

    public static List<MenuCategoryResponse> from(List<MenuCategory> menuCategories) {
        return menuCategories.stream()
                .map(menuCategory -> new MenuCategoryResponse(menuCategory.getId(), menuCategory.getName()))
                .toList();
    }
}
