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

@DataJpaTest
class RestaurantJpaRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RestaurantJpaRepository restaurantJpaRepository;

    @Test
    void 식당_조회() {
        // given
        Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
        Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
        Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
        Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat));

        // when & then
        Long pickeatId = pickeat.getId();
        assertThat(restaurantJpaRepository.findByPickeatId(pickeatId)).hasSize(3);
    }

    @Nested
    class 오래된_비활성화_픽잇의_레스토랑_삭제 {

        @Test
        void 픽잇_ID_목록으로_레스토랑_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.persist(RestaurantFixture.createWithName(pickeat1, "삭제될 레스토랑1"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat1, "삭제될 레스토랑1-2"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat2, "삭제될 레스토랑2"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat3, "유지될 레스토랑"));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = restaurantJpaRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = restaurantJpaRepository.bulkSoftDeleteByPickeatIdIn(deletePickeatIds);

            // then
            List<Restaurant> remainingRestaurants = restaurantJpaRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(3),
                    () -> assertThat(restaurantJpaRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingRestaurants).hasSize(1),
                    () -> assertThat(remainingRestaurants.getFirst().getName()).isEqualTo("유지될 레스토랑")
            );
        }

        @Test
        void 픽잇_ID_목록으로_레스토랑_일괄_소프트_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.persist(RestaurantFixture.createWithName(pickeat1, "삭제될 레스토랑1"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat1, "삭제될 레스토랑1-2"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat2, "삭제될 레스토랑2"));
            testEntityManager.persist(RestaurantFixture.createWithName(pickeat3, "유지될 레스토랑"));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = restaurantJpaRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = restaurantJpaRepository.bulkSoftDeleteByPickeatIdIn(deletePickeatIds);

            // then
            testEntityManager.flush();
            testEntityManager.clear();

            List<Restaurant> remainingRestaurants = restaurantJpaRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(3),
                    () -> assertThat(restaurantJpaRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingRestaurants).hasSize(1),
                    () -> assertThat(remainingRestaurants.getFirst().getName()).isEqualTo("유지될 레스토랑")
            );
        }
    }
}
