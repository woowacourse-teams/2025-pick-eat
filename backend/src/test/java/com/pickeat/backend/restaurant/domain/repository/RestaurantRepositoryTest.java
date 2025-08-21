package com.pickeat.backend.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@ActiveProfiles("test")
class RestaurantRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Test
    void 식당_조회() {
        // given
        Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
        Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
        Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
        Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat));

        restaurant2.exclude();

        // when & then
        assertAll(
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, true))
                        .hasSize(1),
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, false))
                        .hasSize(2),
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, null))
                        .hasSize(3)
        );
    }

    @Nested
    class 오래된_비활성화_픽잇의_레스토랑_삭제 {

        @Test
        void 픽잇_ID_목록으로_레스토랑_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.persist(RestaurantFixture.create(pickeat1, "삭제될 레스토랑1"));
            testEntityManager.persist(RestaurantFixture.create(pickeat1, "삭제될 레스토랑1-2"));
            testEntityManager.persist(RestaurantFixture.create(pickeat2, "삭제될 레스토랑2"));
            testEntityManager.persist(RestaurantFixture.create(pickeat3, "유지될 레스토랑"));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = restaurantRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = restaurantRepository.deleteByPickeatIds(deletePickeatIds);

            // then
            List<Restaurant> remainingRestaurants = restaurantRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(3),
                    () -> assertThat(restaurantRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingRestaurants).hasSize(1),
                    () -> assertThat(remainingRestaurants.getFirst().getName()).isEqualTo("유지될 레스토랑")
            );
        }
    }
}
