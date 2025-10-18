package com.pickeat.backend.tobe.restaurant;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.restaurant.domain.RestaurantType;
import com.pickeat.backend.restaurant.domain.repository.RestaurantJpaRepository;
import com.pickeat.backend.tobe.restaurant.application.RestaurantService;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.tobe.restaurant.infrastructure.RestaurantBulkJdbcRepository;
import com.pickeat.backend.tobe.restaurant.infrastructure.RestaurantLikeRepositoryImpl;
import com.pickeat.backend.tobe.restaurant.infrastructure.RestaurantRepositoryImpl;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {RestaurantService.class, RestaurantBulkJdbcRepository.class, RestaurantRepositoryImpl.class,
        RestaurantLikeRepositoryImpl.class})
public class RestaurantServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private RestaurantJpaRepository restaurantJpaRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Nested
    class 식당_생성_케이스 {

        @Test
        void 식당_생성_성공() {
            // given
            Pickeat pickeat = entityManager.persist(PickeatFixture.createWithoutRoom());
            List<RestaurantRequest> restaurantRequests = List.of(createRestaurantRequest(), createRestaurantRequest());

            // when
            restaurantService.create(restaurantRequests, pickeat.getCode().toString());

            // then
            assertThat(restaurantJpaRepository.findAll()).hasSize(2);
        }

        private RestaurantRequest createRestaurantRequest() {
            return new RestaurantRequest("테스트이름", FoodCategory.CHINESE, 300, "테스트도로명주소", "테스트url", "테스트태그", null, null,
                    RestaurantType.LOCATION);
        }
    }
}
