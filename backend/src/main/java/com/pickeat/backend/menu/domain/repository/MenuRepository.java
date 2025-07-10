package com.pickeat.backend.menu.domain.repository;

import com.pickeat.backend.menu.domain.Menu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByMenuCategoryId(Long menuCategoryId);
}
