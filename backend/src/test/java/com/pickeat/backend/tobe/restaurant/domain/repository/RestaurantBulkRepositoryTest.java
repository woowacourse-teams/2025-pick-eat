package com.pickeat.backend.tobe.restaurant.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.jdbc.core.JdbcTemplate;

@DataJpaTest
class RestaurantBulkRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RestaurantRepository restaurantRepository;

    private RestaurantBulkRepository restaurantBulkRepository;

    @BeforeEach
    void setting() {
        restaurantBulkRepository = new RestaurantBulkRepository(jdbcTemplate);
    }

    @Nested
    class 식당_batch_추가_케이스 {

        @Test
        void 식당_추가_성공() {
            //given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());

            testEntityManager.flush();
            testEntityManager.clear();

            List<Restaurant> restaurants = List.of(RestaurantFixture.create(pickeat),
                    RestaurantFixture.create(pickeat));

            //when
            restaurantBulkRepository.batchInsert(restaurants);

            //then
            assertThat(restaurantRepository.findAll().size()).isEqualTo(2);
        }
    }
}
