package com.pickeat.backend.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.fixture.RoomFixture;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.room.domain.Room;
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
        Room room = testEntityManager.persist(RoomFixture.create());
        Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(room));
        Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(room));
        Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(room));

        restaurant2.exclude();

        // when & then
        assertAll(
                () -> assertThat(restaurantRepository.findByRoomAndIsExcludedIfProvided(room, true)).hasSize(1),
                () -> assertThat(restaurantRepository.findByRoomAndIsExcludedIfProvided(room, false)).hasSize(2),
                () -> assertThat(restaurantRepository.findByRoomAndIsExcludedIfProvided(room, null)).hasSize(3)
        );

    }
}
