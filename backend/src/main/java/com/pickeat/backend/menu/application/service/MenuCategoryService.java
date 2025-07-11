package com.pickeat.backend.menu.application.service;

import com.pickeat.backend.menu.application.dto.response.MenuCategoryResponse;
import com.pickeat.backend.menu.domain.MenuCategory;
import com.pickeat.backend.menu.domain.repository.MenuCategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuCategoryService {

    private final MenuCategoryRepository menuCategoryRepository;

    public List<MenuCategoryResponse> getMenuCategories() {
        List<MenuCategory> menuCategories = menuCategoryRepository.findAll();
        return MenuCategoryResponse.from(menuCategories);
    }
}
