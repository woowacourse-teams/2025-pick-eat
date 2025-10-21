package com.pickeat.backend.pickeat.infrastructure;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.PickeatJpaRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
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
@CacheConfig(cacheNames = CacheNames.PICKEAT)
public class PickeatRepositoryImpl implements PickeatRepository {

    private final PickeatJpaRepository jpaRepository;

    @Override
    @Cacheable(key = "#pickeatCode.value.toString()")
    public Optional<Pickeat> findByCode(PickeatCode pickeatCode) {
        return jpaRepository.findByCode(pickeatCode);
    }

    @Override
    public List<Pickeat> findByRoomId(Long rooId) {
        return jpaRepository.findByRoomId(rooId);
    }

    @Override
    public List<Pickeat> findByRoomIdAndIsActive(Long roomId, Boolean isActive) {
        return jpaRepository.findByRoomIdAndIsActive(roomId, isActive);
    }

    @Override
    public List<Pickeat> findByRoomIdIn(List<Long> roodIds) {
        return jpaRepository.findByRoomIdIn(roodIds);
    }

    @Override
    public Optional<Pickeat> findById(Long pickeatId) {
        return jpaRepository.findById(pickeatId);
    }

    @Override
    public Pickeat save(Pickeat pickeat) {
        return jpaRepository.save(pickeat);
    }

    @CacheEvict(key = "#pickeatCode")
    public void evictPickeatCache(String pickeatCode) {
        log.info("픽잇 캐시 무효화 | pickeatCode: {}", pickeatCode);
    }
}

