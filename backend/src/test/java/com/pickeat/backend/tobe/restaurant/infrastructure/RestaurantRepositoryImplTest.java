package com.pickeat.backend.tobe.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.cache.CacheManagerConfig;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import({RestaurantBulkJdbcRepository.class, RestaurantRepositoryImpl.class, CacheManagerConfig.class})
class RestaurantRepositoryImplTest {
    @Autowired
    private RestaurantRepositoryImpl restaurantRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    void 두번째_식당_조회는_캐시에서_가져온다() {
        // given
        Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
        Restaurant restaurant = testEntityManager.persist(RestaurantFixture.create(pickeat));
        testEntityManager.flush();
        testEntityManager.clear();

        // when
        List<Restaurant> provided = restaurantRepository.findByPickeatAndIsExcludedIfProvided(
                pickeat, false);
        assertThat(provided.getFirst().getId()).isEqualTo(restaurant.getId());
        List<Restaurant> provided2 = restaurantRepository.findByPickeatAndIsExcludedIfProvided(
                pickeat, false);
        assertThat(provided2.getFirst().getId()).isEqualTo(restaurant.getId());

        // then
    }
}