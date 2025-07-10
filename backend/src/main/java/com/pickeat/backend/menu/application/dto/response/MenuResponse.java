package com.pickeat.backend.menu.application.dto.response;

import com.pickeat.backend.menu.domain.Menu;
import java.util.List;

public record MenuResponse(
        Long id,
        String name
) {

    public static List<MenuResponse> from(List<Menu> menus) {
        return menus.stream()
                .map(menu -> new MenuResponse(menu.getId(), menu.getName()))
                .toList();
    }
}
