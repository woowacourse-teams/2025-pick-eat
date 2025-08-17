package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({PickeatScheduler.class})
class PickeatSchedulerTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatScheduler scheduler;

    @Autowired
    private PickeatRepository pickeatRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Nested
    class 오래된_비활성화_픽잇_정리 {

        @Test
        void 오래된_비활성_픽잇과_연관_레스토랑만_삭제() {
            // given
            LocalDateTime oldDate = LocalDateTime.now().minusDays(4);

            Pickeat deletePickeat = testEntityManager.persist(PickeatFixture.createInactiveWithoutRoom());
            setUpdatedAt(deletePickeat.getId(), oldDate);
            testEntityManager.persist(RestaurantFixture.create(deletePickeat, "삭제될 레스토랑"));

            Pickeat keepPickeat1 = testEntityManager.persist(PickeatFixture.createInactiveWithoutRoom());
            testEntityManager.persist(RestaurantFixture.create(keepPickeat1, "유지될 레스토랑1"));

            Pickeat keepPickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            setUpdatedAt(keepPickeat2.getId(), oldDate);
            testEntityManager.persist(RestaurantFixture.create(keepPickeat2, "유지될 레스토랑2"));

            testEntityManager.flush();
            testEntityManager.clear();

            long pickeatCountBefore = pickeatRepository.count();
            long restaurantCountBefore = restaurantRepository.count();

            // when
            scheduler.cleanupOldDeactivatedPickeats();

            // then
            long pickeatCountAfter = pickeatRepository.count();
            long restaurantCountAfter = restaurantRepository.count();

            assertAll(
                    () -> assertThat(pickeatCountAfter).isEqualTo(pickeatCountBefore - 1),
                    () -> assertThat(restaurantCountAfter).isEqualTo(restaurantCountBefore - 1),
                    () -> assertThat(pickeatRepository.existsById(deletePickeat.getId())).isFalse()
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
