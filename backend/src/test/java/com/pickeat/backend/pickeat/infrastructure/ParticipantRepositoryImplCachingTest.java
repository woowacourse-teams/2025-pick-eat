package com.pickeat.backend.pickeat.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.repository.ParticipantJpaRepository;
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
@ContextConfiguration(classes = ParticipantRepositoryImplCachingTest.TestConfig.class)
class ParticipantRepositoryImplCachingTest {

    private static final Long PICKEAT_ID = 42L;

    @Autowired
    private ParticipantRepositoryImpl repository;

    @Autowired
    private ParticipantJpaRepository participantJpaRepository;

    @Autowired
    private CacheManager cacheManager;

    @BeforeEach
    void setUp() {
        Cache cache = cacheManager.getCache(CacheNames.PARTICIPANT);
        if (cache != null) {
            cache.clear();
        }
        reset(participantJpaRepository);
    }

    @Test
    void findByPickeatId_동일_요청은_캐시를_활용한다() {
        // given
        List<Participant> participants = List.of(Mockito.mock(Participant.class));
        when(participantJpaRepository.findByPickeatId(PICKEAT_ID)).thenReturn(participants);

        // when
        List<Participant> firstCall = repository.findByPickeatId(PICKEAT_ID);
        List<Participant> secondCall = repository.findByPickeatId(PICKEAT_ID);

        // then
        assertThat(firstCall).isEqualTo(participants);
        assertThat(secondCall).isEqualTo(participants);
        verify(participantJpaRepository, times(1)).findByPickeatId(PICKEAT_ID);
    }

    @Test
    void evictParticipantCache_호출시_캐시가_무효화된다() {
        // given
        List<Participant> participants = List.of(Mockito.mock(Participant.class));
        when(participantJpaRepository.findByPickeatId(PICKEAT_ID)).thenReturn(participants);

        repository.findByPickeatId(PICKEAT_ID);
        repository.findByPickeatId(PICKEAT_ID);
        verify(participantJpaRepository, times(1)).findByPickeatId(PICKEAT_ID);

        // when
        repository.evictParticipantCache(PICKEAT_ID);
        repository.findByPickeatId(PICKEAT_ID);

        // then
        verify(participantJpaRepository, times(2)).findByPickeatId(PICKEAT_ID);
    }

    @Configuration
    @EnableCaching(proxyTargetClass = true)
    @Import(ParticipantRepositoryImpl.class)
    static class TestConfig {

        @Bean
        CacheManager cacheManager() {
            SimpleCacheManager manager = new SimpleCacheManager();
            manager.setCaches(List.of(new ConcurrentMapCache(CacheNames.PARTICIPANT)));
            return manager;
        }

        @Bean
        ParticipantJpaRepository participantJpaRepository() {
            return Mockito.mock(ParticipantJpaRepository.class);
        }
    }
}
