package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.pickeat.backend.fixture.PickeatFixture;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantJpaRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = RestaurantRepositoryImplCachingTest.TestConfig.class)
class RestaurantRepositoryImplCachingTest {

    @Autowired
    private RestaurantRepositoryImpl repository;

    @Autowired
    private RestaurantJpaRepository restaurantJpaRepository;

    @Autowired
    private CacheManager cacheManager;

    @BeforeEach
    void setUp() {
        Cache cache = cacheManager.getCache("restaurant");
        if (cache != null) {
            cache.clear();
        }
        reset(restaurantJpaRepository);
    }

    @Test
    void findByPickeatId_동일_요청은_캐시를_활용한다() {
        // given
        Long pickeatId = 1L;
        List<Restaurant> restaurants = List.of(Mockito.mock(Restaurant.class));
        when(restaurantJpaRepository.findByPickeatId(pickeatId)).thenReturn(restaurants);

        // when
        List<Restaurant> firstCall = repository.findByPickeatId(pickeatId);
        List<Restaurant> secondCall = repository.findByPickeatId(pickeatId);

        // then
        assertThat(firstCall).isSameAs(restaurants);
        assertThat(secondCall).isSameAs(restaurants);
        verify(restaurantJpaRepository, times(1)).findByPickeatId(pickeatId);
    }

    @Test
    void evictRestaurantCache_호출시_캐시를_무효화한다() {
        // given
        Long pickeatId = 2L;
        List<Restaurant> restaurants = List.of(Mockito.mock(Restaurant.class));
        when(restaurantJpaRepository.findByPickeatId(pickeatId)).thenReturn(restaurants);

        repository.findByPickeatId(pickeatId);
        repository.findByPickeatId(pickeatId);

        verify(restaurantJpaRepository, times(1)).findByPickeatId(pickeatId);

        Pickeat pickeat = PickeatFixture.createWithoutRoom();
        ReflectionTestUtils.setField(pickeat, "id", pickeatId);

        // when
        repository.evictRestaurantCache(pickeat);
        repository.findByPickeatId(pickeatId);

        // then
        verify(restaurantJpaRepository, times(2)).findByPickeatId(pickeatId);
    }

    @Configuration
    @Import(RestaurantRepositoryImpl.class)
    @EnableCaching(proxyTargetClass = true)
    static class TestConfig {

        @Bean
        CacheManager cacheManager() {
            SimpleCacheManager manager = new SimpleCacheManager();
            manager.setCaches(List.of(new ConcurrentMapCache("restaurant")));
            return manager;
        }

        @Bean
        RestaurantJpaRepository restaurantJpaRepository() {
            return Mockito.mock(RestaurantJpaRepository.class);
        }

        @Bean
        RestaurantJdbcRepository restaurantJdbcRepository() {
            return Mockito.mock(RestaurantJdbcRepository.class);
        }
    }
}
