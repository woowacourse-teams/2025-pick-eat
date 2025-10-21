package com.pickeat.backend.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.ParticipantFixture;
import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
class RestaurantLikeJpaRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private RestaurantLikeJpaRepository restaurantLikeJpaRepository;

    @Nested
    class 레스토랑_좋아요_삭제 {

        @Test
        void 레스토랑_ID_목록으로_레스토랑_좋아요_일괄_삭제() {
            // given
            Pickeat pickeat1 = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Pickeat pickeat2 = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat1));
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat1));
            Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat2));

            Participant participant1 = testEntityManager.persist(ParticipantFixture.create(pickeat1.getId()));
            Participant participant2 = testEntityManager.persist(ParticipantFixture.create(pickeat1.getId()));
            Participant participant3 = testEntityManager.persist(ParticipantFixture.create(pickeat2.getId()));

            testEntityManager.persist(new RestaurantLike(participant1.getId(), restaurant1.getId()));
            testEntityManager.persist(new RestaurantLike(participant2.getId(), restaurant1.getId()));
            testEntityManager.persist(new RestaurantLike(participant1.getId(), restaurant2.getId()));
            testEntityManager.persist(new RestaurantLike(participant3.getId(), restaurant3.getId()));

            testEntityManager.flush();
            testEntityManager.clear();

            long beforeCount = restaurantLikeJpaRepository.count();
            List<Long> deleteRestaurantIds = List.of(restaurant1.getId(), restaurant2.getId());

            // when
            int deletedCount = restaurantLikeJpaRepository.bulkSoftDeleteByRestaurantIdIn(deleteRestaurantIds);

            // then
            testEntityManager.flush();
            testEntityManager.clear();

            List<RestaurantLike> remainingLikes = restaurantLikeJpaRepository.findAll();
            assertAll(
                    () -> assertThat(deletedCount).isEqualTo(3),
                    () -> assertThat(restaurantLikeJpaRepository.count()).isEqualTo(beforeCount - deletedCount),
                    () -> assertThat(remainingLikes).hasSize(1),
                    () -> assertThat(remainingLikes.getFirst().getRestaurantId()).isEqualTo(restaurant3.getId())
            );
        }
    }
}
