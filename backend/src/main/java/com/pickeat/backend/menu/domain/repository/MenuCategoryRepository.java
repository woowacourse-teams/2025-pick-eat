package com.pickeat.backend.menu.domain.repository;

import com.pickeat.backend.menu.domain.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Long> {

}
