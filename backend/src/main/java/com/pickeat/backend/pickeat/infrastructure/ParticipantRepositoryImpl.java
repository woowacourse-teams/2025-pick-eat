package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.repository.ParticipantJpaRepository;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class ParticipantRepositoryImpl implements ParticipantRepository {

    private final ParticipantJpaRepository jpaRepository;

    @Override
    public List<Participant> findByPickeatIdIn(List<Long> pickeatIds) {
        return jpaRepository.findByPickeatIdIn(pickeatIds);
    }

    @Override
    @Cacheable(value = CacheNames.PARTICIPANT, key = "#pickeatId")
    public List<Participant> findByPickeatId(Long pickeatId) {
        return jpaRepository.findByPickeatId(pickeatId);
    }

    @Override
    public Participant save(Participant participant) {
        return jpaRepository.save(participant);
    }

    @Override
    public Optional<Participant> findById(Long participantId) {
        return jpaRepository.findById(participantId);
    }

    @CacheEvict(value = CacheNames.PARTICIPANT, key = "#pickeatId")
    public void evictParticipantCache(Long pickeatId) {
        log.info("참가자 캐시 무효화 | pickeatId: {}", pickeatId);
    }
}
