package com.pickeat.backend.restaurant.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {RestaurantService.class})
class RestaurantServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Test
    void 식당_소거_성공() {
        // given
        List<Restaurant> restaurants = List.of(
                entityManager.persist(RestaurantFixture.create()),
                entityManager.persist(RestaurantFixture.create()),
                entityManager.persist(RestaurantFixture.create()));
        List<Long> restaurantIds = restaurants.stream().map(BaseEntity::getId).toList();

        entityManager.flush();
        entityManager.clear();

        // when
        restaurantService.exclude(new RestaurantExcludeRequest(restaurantIds));

        // then
        List<Restaurant> actualRestaurants = restaurantRepository.findAll();
        assertThat(actualRestaurants)
                .extracting(Restaurant::getIsExcluded)
                .containsExactly(true, true, true);
    }
}
