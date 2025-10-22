package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.repository.ParticipantJpaRepository;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
@CacheConfig(cacheNames = CacheNames.PARTICIPANT)
public class ParticipantRepositoryImpl implements ParticipantRepository {

    private final ParticipantJpaRepository jpaRepository;

    @Override
    @Cacheable(key = "#pickeatId")
    public List<Participant> findByPickeatId(Long pickeatId) {
        return jpaRepository.findByPickeatId(pickeatId);
    }

    @Override
    //Todo: 인메모리 도입, 이벤트 처리 대신, save 호출시 직접 캐시 만료 시키기 고려 [2025-10-21 14:56:39]
    //@CacheEvict(key = "#participant.pickeatId")
    public Participant save(Participant participant) {
        return jpaRepository.save(participant);
    }

    @Override
    public Optional<Participant> findById(Long participantId) {
        return jpaRepository.findById(participantId);
    }

    @CacheEvict(key = "#pickeatId")
    public void evictParticipantCache(Long pickeatId) {
        log.info("참가자 캐시 무효화 | pickeatId: {}", pickeatId);
    }
}
