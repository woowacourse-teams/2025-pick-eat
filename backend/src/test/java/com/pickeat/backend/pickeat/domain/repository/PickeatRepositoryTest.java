package com.pickeat.backend.pickeat.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class PickeatRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatRepository pickeatRepository;

    @Nested
    class 오래된_비활성화_픽잇_삭제 {

        @Test
        void cutoff_시간_이전에_비활성화된_픽잇_삭제_성공() {
            // given
            LocalDateTime cutoffDate = LocalDateTime.now().minusDays(2);
            LocalDateTime oldDate = cutoffDate.minusHours(1);

            Pickeat deletePickeat = testEntityManager.persist(
                    PickeatFixture.createInactiveWithoutRoom());
            setUpdatedAt(deletePickeat.getId(), oldDate);

            Pickeat keepPickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = pickeatRepository.count();

            // when
            int deletedCount = pickeatRepository.deleteOldDeactivatedPickeats(cutoffDate);

            testEntityManager.flush();

            // then
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(1),
                    () -> assertThat(pickeatRepository.count()).isEqualTo(beforeCount - deletedCount)
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
