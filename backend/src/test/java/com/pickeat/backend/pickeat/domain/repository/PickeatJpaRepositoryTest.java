package com.pickeat.backend.pickeat.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class PickeatJpaRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private PickeatJpaRepository pickeatJpaRepository;

    @Nested
    class 픽잇_삭제 {

        @Test
        void 픽잇_ID_목록으로_픽잇_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = pickeatJpaRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = pickeatJpaRepository.bulkSoftDeleteByIdIn(deletePickeatIds);

            // then
            testEntityManager.flush();
            testEntityManager.clear();

            List<Pickeat> remainingPickeats = pickeatJpaRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(2),
                    () -> assertThat(pickeatJpaRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingPickeats).hasSize(1),
                    () -> assertThat(remainingPickeats.getFirst().getId()).isEqualTo(pickeat3.getId())
            );
        }
    }
}
