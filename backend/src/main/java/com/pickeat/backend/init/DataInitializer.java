package com.pickeat.backend.init;

import com.pickeat.backend.menu.domain.Menu;
import com.pickeat.backend.menu.domain.MenuCategory;
import com.pickeat.backend.menu.domain.repository.MenuCategoryRepository;
import com.pickeat.backend.menu.domain.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MenuCategoryRepository menuCategoryRepository;
    private final MenuRepository menuRepository;

    @Override
    public void run(String... args) throws Exception {
        MenuCategory korean = menuCategoryRepository.save(new MenuCategory("한식"));
        MenuCategory chinese = menuCategoryRepository.save(new MenuCategory("중식"));
        MenuCategory western = menuCategoryRepository.save(new MenuCategory("양식"));
        MenuCategory japanese = menuCategoryRepository.save(new MenuCategory("일식"));
        MenuCategory bunsik = menuCategoryRepository.save(new MenuCategory("분식"));
        MenuCategory fastfood = menuCategoryRepository.save(new MenuCategory("패스트푸드"));
        MenuCategory etc = menuCategoryRepository.save(new MenuCategory("기타"));

        menuRepository.save(new Menu("찌개류", korean));
        menuRepository.save(new Menu("밥류", korean));
        menuRepository.save(new Menu("국물류", korean));
        menuRepository.save(new Menu("구이류", korean));
        menuRepository.save(new Menu("전류", korean));
        menuRepository.save(new Menu("나물류", korean));
        menuRepository.save(new Menu("김치류", korean));

        menuRepository.save(new Menu("면류", chinese));
        menuRepository.save(new Menu("볶음류", chinese));
        menuRepository.save(new Menu("찜류", chinese));
        menuRepository.save(new Menu("딤섬류", chinese));
        menuRepository.save(new Menu("죽류", chinese));
        menuRepository.save(new Menu("탕류", chinese));

        menuRepository.save(new Menu("파스타류", western));
        menuRepository.save(new Menu("빵류", western));
        menuRepository.save(new Menu("스테이크류", western));
        menuRepository.save(new Menu("샐러드류", western));
        menuRepository.save(new Menu("수프류", western));
        menuRepository.save(new Menu("그라탱류", western));
        menuRepository.save(new Menu("디저트류", western));

        menuRepository.save(new Menu("스시류", japanese));
        menuRepository.save(new Menu("라멘류", japanese));
        menuRepository.save(new Menu("돈부리류", japanese));
        menuRepository.save(new Menu("야키류", japanese));
        menuRepository.save(new Menu("덴푸라류", japanese));
        menuRepository.save(new Menu("나베류", japanese));

        menuRepository.save(new Menu("떡볶이류", bunsik));
        menuRepository.save(new Menu("튀김류", bunsik));
        menuRepository.save(new Menu("순대류", bunsik));
        menuRepository.save(new Menu("김밥류", bunsik));
        menuRepository.save(new Menu("어묵류", bunsik));

        menuRepository.save(new Menu("햄버거류", fastfood));
        menuRepository.save(new Menu("치킨류", fastfood));
        menuRepository.save(new Menu("피자류", fastfood));
        menuRepository.save(new Menu("샌드위치류", fastfood));

        menuRepository.save(new Menu("동남아시아류", etc));
        menuRepository.save(new Menu("인도류", etc));
        menuRepository.save(new Menu("멕시코류", etc));
        menuRepository.save(new Menu("터키/중동류", etc));
        menuRepository.save(new Menu("퓨전류", etc));
    }
}
