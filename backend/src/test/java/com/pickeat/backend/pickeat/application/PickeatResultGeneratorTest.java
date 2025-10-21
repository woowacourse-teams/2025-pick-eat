package com.pickeat.backend.pickeat.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.fixture.RestaurantFixture;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import java.util.Map;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(PickeatResultGenerator.class)
class PickeatResultGeneratorTest {

    @Autowired
    private PickeatResultGenerator pickeatResultGenerator;

    @Autowired
    private TestEntityManager testEntityManager;

    @Nested
    class 랜덤_최고_선호도_식당_단건_조회_케이스 {

        @Test
        void 최고_선호도_식당이_단_한개일_경우_해당_식당_반환() {
            // given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount1 = 1;
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount2 = 2;

            Map<Restaurant, Integer> likeCounts = Map.of(restaurant1, likeCount1, restaurant2, likeCount2);

            // when
            Restaurant topRestaurant = pickeatResultGenerator.generate(likeCounts);

            // then
            assertThat(topRestaurant).isEqualTo(restaurant2);
        }

        @Test
        void 동점인_최고_선호도_식당들_중_하나를_랜덤_선택() {
            // given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount1 = 1;
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount2 = 1;
            Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount3 = 0;

            Map<Restaurant, Integer> likeCounts = Map.of(
                    restaurant1, likeCount1,
                    restaurant2, likeCount2,
                    restaurant3, likeCount3
            );

            // when
            Restaurant topRestaurant = pickeatResultGenerator.generate(likeCounts);

            // then
            assertThat(topRestaurant).isIn(restaurant1, restaurant2);
        }


        @Test
        void 빈_식당_리스트일_경우_예외_발생() {
            // given
            Map<Restaurant, Integer> likeCounts = Map.of();

            // when & then
            assertThatThrownBy(() -> pickeatResultGenerator.generate(likeCounts))
                    .isInstanceOf(BusinessException.class)
                    .hasMessage(ErrorCode.RESTAURANTS_IS_EMPTY.getMessage());
        }

        @Test
        void 모든_식당이_0점일_때_전체에서_랜덤_선택() {
            // given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount1 = 0;
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount2 = 0;

            Map<Restaurant, Integer> likeCounts = Map.of(restaurant1, likeCount1,
                    restaurant2, likeCount2);

            // when
            Restaurant topRestaurant = pickeatResultGenerator.generate(likeCounts);

            // then
            assertThat(topRestaurant).isIn(restaurant1, restaurant2);
        }

        @Test
        void 다양한_선호도_중_최고점만_선택() {
            // given
            Pickeat pickeat = testEntityManager.persist(PickeatFixture.createWithoutRoom());
            Restaurant restaurant1 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount1 = 1;
            Restaurant restaurant2 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount2 = 2;
            Restaurant restaurant3 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount3 = 2;
            Restaurant restaurant4 = testEntityManager.persist(RestaurantFixture.create(pickeat));
            Integer likeCount4 = 3;

            Map<Restaurant, Integer> likeCounts = Map.of(
                    restaurant1, likeCount1,
                    restaurant2, likeCount2,
                    restaurant3, likeCount3,
                    restaurant4, likeCount4
            );

            // when
            Restaurant topRestaurant = pickeatResultGenerator.generate(likeCounts);

            // then
            assertThat(topRestaurant).isEqualTo(restaurant4);
        }
    }
}
