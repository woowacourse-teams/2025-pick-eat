package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
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

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = RestaurantLikeRepositoryImplCachingTest.TestConfig.class)
class RestaurantLikeRepositoryImplCachingTest {

    @Autowired
    private RestaurantLikeRepositoryImpl repository;

    @Autowired
    private RestaurantLikeJpaRepository restaurantLikeJpaRepository;

    @Autowired
    private CacheManager cacheManager;

    @BeforeEach
    void setUp() {
        Cache likeCountCache = cacheManager.getCache(CacheNames.RESTAURANT_LIKE_COUNT);
        Cache participantLikesCache = cacheManager.getCache(CacheNames.PARTICIPANT_LIKES);
        if (likeCountCache != null) {
            likeCountCache.clear();
        }
        if (participantLikesCache != null) {
            participantLikesCache.clear();
        }
        reset(restaurantLikeJpaRepository);
    }

    @Test
    void countByRestaurantId_동일_요청은_캐시를_활용한다() {
        // given
        Long restaurantId = 100L;
        when(restaurantLikeJpaRepository.countByRestaurantId(restaurantId)).thenReturn(3);

        // when
        Integer firstCall = repository.countByRestaurantId(restaurantId);
        Integer secondCall = repository.countByRestaurantId(restaurantId);

        // then
        assertThat(firstCall).isEqualTo(3);
        assertThat(secondCall).isEqualTo(3);
        verify(restaurantLikeJpaRepository, times(1)).countByRestaurantId(restaurantId);
    }

    @Test
    void findAllByParticipantId_동일_요청은_캐시를_활용한다() {
        // given
        Long participantId = 55L;
        List<RestaurantLike> likes = List.of(new RestaurantLike(participantId, 200L));
        when(restaurantLikeJpaRepository.findAllByParticipantId(participantId)).thenReturn(likes);

        // when
        List<RestaurantLike> firstCall = repository.findAllByParticipantId(participantId);
        List<RestaurantLike> secondCall = repository.findAllByParticipantId(participantId);

        // then
        assertThat(firstCall).isEqualTo(likes);
        assertThat(secondCall).isEqualTo(likes);
        verify(restaurantLikeJpaRepository, times(1)).findAllByParticipantId(participantId);
    }

    @Test
    void save_호출시_좋아요수와_참여자캐시를_무효화한다() {
        // given
        Long restaurantId = 300L;
        Long participantId = 77L;
        RestaurantLike restaurantLike = new RestaurantLike(participantId, restaurantId);

        when(restaurantLikeJpaRepository.countByRestaurantId(restaurantId)).thenReturn(1);
        when(restaurantLikeJpaRepository.findAllByParticipantId(participantId))
                .thenReturn(List.of(new RestaurantLike(participantId, restaurantId)));
        when(restaurantLikeJpaRepository.save(any(RestaurantLike.class))).thenReturn(restaurantLike);

        repository.countByRestaurantId(restaurantId);
        repository.findAllByParticipantId(participantId);

        verify(restaurantLikeJpaRepository, times(1)).countByRestaurantId(restaurantId);
        verify(restaurantLikeJpaRepository, times(1)).findAllByParticipantId(participantId);

        // when
        repository.save(restaurantLike);

        Integer likeCount = repository.countByRestaurantId(restaurantId);
        List<RestaurantLike> participantLikes = repository.findAllByParticipantId(participantId);

        // then
        assertThat(likeCount).isEqualTo(1);
        assertThat(participantLikes).hasSize(1);
        verify(restaurantLikeJpaRepository, times(1)).save(restaurantLike);
        verify(restaurantLikeJpaRepository, times(2)).countByRestaurantId(restaurantId);
        verify(restaurantLikeJpaRepository, times(2)).findAllByParticipantId(participantId);
    }

    @Test
    void delete_호출시_좋아요수와_참여자캐시를_무효화한다() {
        // given
        Long restaurantId = 400L;
        Long participantId = 88L;

        when(restaurantLikeJpaRepository.countByRestaurantId(restaurantId)).thenReturn(2);
        when(restaurantLikeJpaRepository.findAllByParticipantId(participantId))
                .thenReturn(List.of(new RestaurantLike(participantId, restaurantId)));

        repository.countByRestaurantId(restaurantId);
        repository.findAllByParticipantId(participantId);

        verify(restaurantLikeJpaRepository, times(1)).countByRestaurantId(restaurantId);
        verify(restaurantLikeJpaRepository, times(1)).findAllByParticipantId(participantId);

        // when
        repository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);

        Integer likeCount = repository.countByRestaurantId(restaurantId);
        List<RestaurantLike> participantLikes = repository.findAllByParticipantId(participantId);

        // then
        assertThat(likeCount).isEqualTo(2);
        assertThat(participantLikes).hasSize(1);
        verify(restaurantLikeJpaRepository, times(1)).deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
        verify(restaurantLikeJpaRepository, times(2)).countByRestaurantId(restaurantId);
        verify(restaurantLikeJpaRepository, times(2)).findAllByParticipantId(participantId);
    }

    @Configuration
    @EnableCaching(proxyTargetClass = true)
    @Import(RestaurantLikeRepositoryImpl.class)
    static class TestConfig {

        @Bean
        CacheManager cacheManager() {
            SimpleCacheManager manager = new SimpleCacheManager();
            manager.setCaches(List.of(
                    new ConcurrentMapCache(CacheNames.RESTAURANT_LIKE_COUNT),
                    new ConcurrentMapCache(CacheNames.PARTICIPANT_LIKES)
            ));
            return manager;
        }

        @Bean
        RestaurantLikeJpaRepository restaurantLikeJpaRepository() {
            return Mockito.mock(RestaurantLikeJpaRepository.class);
        }
    }
}
