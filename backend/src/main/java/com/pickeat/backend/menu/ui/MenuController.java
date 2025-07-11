package com.pickeat.backend.menu.ui;

import com.pickeat.backend.menu.application.dto.response.MenuResponse;
import com.pickeat.backend.menu.application.service.MenuService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("{categoryId}/menus")
    public List<MenuResponse> getMenus(
            @PathVariable("categoryId") Long categoryId
    ) {
        return menuService.getMenus(categoryId);
    }
}
