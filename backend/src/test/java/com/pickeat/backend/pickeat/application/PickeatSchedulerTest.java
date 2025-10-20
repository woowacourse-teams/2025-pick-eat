package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatResultRepository;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.time.LocalDateTime;
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
    private ParticipantRepository participantRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantLikeRepository restaurantLikeRepository;

    @Autowired
    private PickeatResultRepository pickeatResultRepository;

    @Test
    void 오래된_픽잇_삭제() {
        // given
        LocalDateTime oldDate = LocalDateTime.now().minusDays(3);

        Pickeat deletePickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
        setUpdatedAt(deletePickeat.getId(), oldDate);

        Pickeat keepPickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());

        testEntityManager.flush();
        testEntityManager.clear();

        long pickeatCountBefore = pickeatRepository.count();

        // when
        scheduler.cleanupOldPickeats();

        // then
        long pickeatCountAfter = pickeatRepository.count();
        assertAll(
                () -> assertThat(pickeatCountAfter).isEqualTo(pickeatCountBefore - 1),
                () -> assertThat(pickeatRepository.existsById(deletePickeat.getId())).isFalse(),
                () -> assertThat(pickeatRepository.existsById(keepPickeat.getId())).isTrue()
        );
    }

    @Test
    void 픽잇_삭제시_연관된_데이터도_함께_삭제() {
        // given
        LocalDateTime oldDate = LocalDateTime.now().minusDays(3);

        Pickeat deletePickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
        setUpdatedAt(deletePickeat.getId(), oldDate);

        // 연관 데이터 생성
        Restaurant restaurant = testEntityManager.persist(RestaurantFixture.create(deletePickeat));
        Participant participant = testEntityManager.persist(ParticipantFixture.create(deletePickeat.getId()));
        RestaurantLike like = testEntityManager.persist(new RestaurantLike(participant.getId(), restaurant.getId()));
        PickeatResult result = testEntityManager.persist(new PickeatResult(deletePickeat.getId(), restaurant.getId()));

        testEntityManager.flush();
        testEntityManager.clear();

        // when
        scheduler.cleanupOldPickeats();

        // then
        assertAll(
                () -> assertThat(pickeatRepository.existsById(deletePickeat.getId())).isFalse(),
                () -> assertThat(restaurantRepository.existsById(restaurant.getId())).isFalse(),
                () -> assertThat(participantRepository.existsById(participant.getId())).isFalse(),
                () -> assertThat(restaurantLikeRepository.existsById(like.getId())).isFalse(),
                () -> assertThat(pickeatResultRepository.existsById(result.getId())).isFalse()
        );
    }

    private void setUpdatedAt(Long pickeatId, LocalDateTime oldDate) {
        testEntityManager.getEntityManager().createNativeQuery(
                        "UPDATE pickeat SET updated_at = :oldDate WHERE id = :id")
                .setParameter("oldDate", oldDate)
                .setParameter("id", pickeatId)
                .executeUpdate();
    }
}
