package com.pickeat.backend.menu.ui;

import com.pickeat.backend.menu.application.dto.response.MenuCategoryResponse;
import com.pickeat.backend.menu.application.service.MenuCategoryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;

    @GetMapping
    public List<MenuCategoryResponse> getMenuCategories() {
        return menuCategoryService.getMenuCategories();
    }
}
