package com.pickeat.backend.menu.application.service;

import com.pickeat.backend.menu.application.dto.response.MenuResponse;
import com.pickeat.backend.menu.domain.Menu;
import com.pickeat.backend.menu.domain.repository.MenuRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    public List<MenuResponse> getMenus(Long categoryId) {
        List<Menu> menus = menuRepository.findByMenuCategoryId(categoryId);
        return MenuResponse.from(menus);
    }
}
