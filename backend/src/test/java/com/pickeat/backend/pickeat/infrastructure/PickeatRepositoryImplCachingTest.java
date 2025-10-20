package com.pickeat.backend.pickeat.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.PickeatJpaRepository;
import java.util.List;
import java.util.Optional;
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
@ContextConfiguration(classes = PickeatRepositoryImplCachingTest.TestConfig.class)
class PickeatRepositoryImplCachingTest {

    private static final PickeatCode PICKEAT_CODE = new PickeatCode("b6f91d2e-7c38-4e7d-9f43-5d3b8470a1e4");

    @Autowired
    private PickeatRepositoryImpl repository;

    @Autowired
    private PickeatJpaRepository pickeatJpaRepository;

    @Autowired
    private CacheManager cacheManager;

    @BeforeEach
    void setUp() {
        Cache cache = cacheManager.getCache(PickeatRepositoryImpl.PICKEAT_CACHE_NAME);
        if (cache != null) {
            cache.clear();
        }
        reset(pickeatJpaRepository);
    }

    @Test
    void findByCode_동일_요청은_캐시를_활용한다() {
        // given
        Pickeat pickeat = Mockito.mock(Pickeat.class);
        when(pickeatJpaRepository.findByCode(PICKEAT_CODE)).thenReturn(Optional.of(pickeat));

        // when
        Optional<Pickeat> firstCall = repository.findByCode(PICKEAT_CODE);
        Optional<Pickeat> secondCall = repository.findByCode(PICKEAT_CODE);

        // then
        assertThat(firstCall).contains(pickeat);
        assertThat(secondCall).contains(pickeat);
        verify(pickeatJpaRepository, times(1)).findByCode(PICKEAT_CODE);
    }

    @Test
    void evictPickeatCache_호출시_캐시가_무효화된다() {
        // given
        Pickeat pickeat = Mockito.mock(Pickeat.class);
        when(pickeatJpaRepository.findByCode(PICKEAT_CODE)).thenReturn(Optional.of(pickeat));

        repository.findByCode(PICKEAT_CODE);
        repository.findByCode(PICKEAT_CODE);
        verify(pickeatJpaRepository, times(1)).findByCode(PICKEAT_CODE);

        Pickeat cachedPickeat = Mockito.mock(Pickeat.class);
        when(cachedPickeat.getCode()).thenReturn(PICKEAT_CODE);

        // when
        repository.evictPickeatCache(cachedPickeat);
        repository.findByCode(PICKEAT_CODE);

        // then
        verify(pickeatJpaRepository, times(2)).findByCode(PICKEAT_CODE);
    }

    @Configuration
    @EnableCaching(proxyTargetClass = true)
    @Import(PickeatRepositoryImpl.class)
    static class TestConfig {

        @Bean
        CacheManager cacheManager() {
            SimpleCacheManager manager = new SimpleCacheManager();
            manager.setCaches(List.of(new ConcurrentMapCache(PickeatRepositoryImpl.PICKEAT_CACHE_NAME)));
            return manager;
        }

        @Bean
        PickeatJpaRepository pickeatJpaRepository() {
            return Mockito.mock(PickeatJpaRepository.class);
        }
    }
}
