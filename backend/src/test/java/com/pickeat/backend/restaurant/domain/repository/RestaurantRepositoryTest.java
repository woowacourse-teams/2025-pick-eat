package com.pickeat.backend.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.time.LocalDateTime;
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
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, true)).hasSize(1),
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, false)).hasSize(2),
                () -> assertThat(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, null)).hasSize(3)
        );
    }

    @Nested
    class 오래된_비활성화_픽잇의_레스토랑_삭제 {

        @Test
        void 오래된_비활성_픽잇에_연결된_레스토랑_삭제() {
            // given
            LocalDateTime cutoffDate = LocalDateTime.now().minusDays(2);
            LocalDateTime oldDate = cutoffDate.minusHours(1);

            Pickeat deletePickeat = testEntityManager.persist(
                    PickeatFixture.createInactiveWithoutRoom());
            setUpdatedAt(deletePickeat.getId(), oldDate);
            testEntityManager.persist(RestaurantFixture.create(deletePickeat, "삭제될 레스토랑"));

            Pickeat keepPickeat1 = testEntityManager.persist(
                    PickeatFixture.createInactiveWithoutRoom());
            testEntityManager.persist(RestaurantFixture.create(keepPickeat1, "유지될 레스토랑1"));

            Pickeat keepPickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            setUpdatedAt(keepPickeat2.getId(), oldDate);
            testEntityManager.persist(RestaurantFixture.create(keepPickeat2, "유지될 레스토랑2"));

            testEntityManager.flush();

            long beforeCount = restaurantRepository.count();

            // when
            int deletedCount = restaurantRepository.deleteAllByOldDeactivatedPickeats(cutoffDate);

            testEntityManager.flush();
            List<Restaurant> remainingRestaurants = restaurantRepository.findAll();

            // then
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(1),
                    () -> assertThat(restaurantRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingRestaurants).hasSize(2),
                    () -> assertThat(remainingRestaurants).extracting(Restaurant::getName)
                            .containsExactlyInAnyOrder("유지될 레스토랑1", "유지될 레스토랑2")
            );
        }
    }

    private void setUpdatedAt(Long pickeatId, LocalDateTime oldDate) {
        testEntityManager.getEntityManager().createNativeQuery(
                        "UPDATE pickeat SET updated_at = :oldDate WHERE id = :id")
                .setParameter("oldDate", oldDate)
                .setParameter("id", pickeatId)
                .executeUpdate();
    }
}
