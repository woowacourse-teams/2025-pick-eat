package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {WishService.class})
class WishServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishRepository wishRepository;

    @Autowired
    private WishService wishService;


    @Nested
    class 위시_생성_케이스 {

        @Test
        void 위시_생성_성공() {
            // given
            WishList wishList = entityManager.persist(new WishList("위시 리스트", 2L, false));
            WishRequest wishRequest = new WishRequest("위시1", "일식", List.of(), "도로명주소1", List.of("태그1", "태그2"));

            entityManager.flush();
            entityManager.clear();

            // when
            WishResponse response = wishService.createWish(wishList.getId(), wishRequest);

            // then
            assertThat(wishRepository.findById(response.id())).isNotNull();
        }
    }

    @Nested
    class 위시_삭제_케이스 {

        @Test
        void 위시_삭제_성공() {
            // given
            WishList wishList = entityManager.persist(new WishList("위시 리스트", 2L, false));
            Wish wish = entityManager.persist(
                    new Wish("위시", FoodCategory.KOREAN, "도로명주소", "태그1,태그2", wishList.getId()));

            entityManager.flush();
            entityManager.clear();

            // when
            wishService.deleteWish(wish.getId());

            // then
            assertThat(wishRepository.findAll()).isEmpty();
        }
    }
}
