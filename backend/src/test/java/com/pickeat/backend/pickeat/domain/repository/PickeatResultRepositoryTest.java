package com.pickeat.backend.pickeat.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class PickeatResultRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatResultRepository pickeatResultRepository;

    @Nested
    class 픽잇_결과_삭제 {

        @Test
        void 픽잇_ID_목록으로_픽잇_결과_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat1));
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat2));
            Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat3));

            testEntityManager.persist(new PickeatResult(pickeat1.getId(), restaurant1.getId()));
            testEntityManager.persist(new PickeatResult(pickeat2.getId(), restaurant2.getId()));
            testEntityManager.persist(new PickeatResult(pickeat3.getId(), restaurant3.getId()));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = pickeatResultRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = pickeatResultRepository.bulkSoftDeleteByPickeatIdIn(deletePickeatIds);

            // then
            testEntityManager.flush();
            testEntityManager.clear();

            List<PickeatResult> remainingResults = pickeatResultRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(2),
                    () -> assertThat(pickeatResultRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingResults).hasSize(1),
                    () -> assertThat(remainingResults.getFirst().getPickeatId()).isEqualTo(pickeat3.getId())
            );
        }
    }
}
