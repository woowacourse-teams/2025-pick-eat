package com.pickeat.backend.init;

import com.pickeat.backend.menu.domain.MenuCategory;
import com.pickeat.backend.menu.domain.repository.MenuCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MenuCategoriesDataInitializer implements CommandLineRunner {

    private final MenuCategoryRepository menuCategoryRepository;

    @Override
    public void run(String... args) throws Exception {
        menuCategoryRepository.save(new MenuCategory("한식"));
        menuCategoryRepository.save(new MenuCategory("중식"));
        menuCategoryRepository.save(new MenuCategory("양식"));
        menuCategoryRepository.save(new MenuCategory("일식"));
        menuCategoryRepository.save(new MenuCategory("분식"));
        menuCategoryRepository.save(new MenuCategory("패스트푸트"));
        menuCategoryRepository.save(new MenuCategory("기타"));
    }
}
