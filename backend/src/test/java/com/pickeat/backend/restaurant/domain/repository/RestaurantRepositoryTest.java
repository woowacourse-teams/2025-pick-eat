package com.pickeat.backend.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
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
        Pickeat pickeat = testEntityManager.persist(PickeatFixture.create());
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
}
