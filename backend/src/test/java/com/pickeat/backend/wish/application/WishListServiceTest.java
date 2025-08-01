package com.pickeat.backend.wish.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {WishListService.class})
class WishListServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private WishListService wishListService;

    @Nested
    class 위시리스트_조회_케이스 {

        @Test
        void 위시리스트_조회_성공() {
            // given
            List<WishList> wishLists = List.of(
                    entityManager.persist(new WishList("방의 위시리스트1", 2L, false)),
                    entityManager.persist(new WishList("방의 위시리스트2", 2L, false)),
                    entityManager.persist(new WishList("공통 위시리스트1", 1L, true)),
                    entityManager.persist(new WishList("공통 위시리스트2", 1L, true)));

            entityManager.flush();
            entityManager.clear();

            // when
            List<WishListResponse> expectedResponse = wishListService.getWishLists(2L);

            // then
            List<Long> actualWishListIds = wishLists.stream().map(BaseEntity::getId).toList();
            assertThat(expectedResponse)
                    .extracting(WishListResponse::id)
                    .containsExactlyInAnyOrderElementsOf(actualWishListIds);
        }
    }
}
