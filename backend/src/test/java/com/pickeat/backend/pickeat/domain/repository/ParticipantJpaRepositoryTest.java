package com.pickeat.backend.pickeat.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class ParticipantJpaRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private ParticipantJpaRepository participantJpaRepository;

    @Nested
    class 참가자_삭제 {

        @Test
        void 픽잇_ID_목록으로_참가자_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat3 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.persist(ParticipantFixture.create(pickeat1.getId()));
            testEntityManager.persist(ParticipantFixture.create(pickeat1.getId()));
            testEntityManager.persist(ParticipantFixture.create(pickeat2.getId()));
            testEntityManager.persist(ParticipantFixture.create(pickeat3.getId()));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = participantJpaRepository.count();
            List<Long> deletePickeatIds = List.of(pickeat1.getId(), pickeat2.getId());

            // when
            int deletedCount = participantJpaRepository.bulkSoftDeleteByPickeatIdIn(deletePickeatIds);

            // then
            testEntityManager.flush();
            testEntityManager.clear();

            List<Participant> remainingParticipants = participantJpaRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(3),
                    () -> assertThat(participantJpaRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingParticipants).hasSize(1),
                    () -> assertThat(remainingParticipants.getFirst().getPickeatId()).isEqualTo(pickeat3.getId())
            );
        }
    }
}
