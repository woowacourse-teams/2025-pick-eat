package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.BaseEntity;
import com.pickeat.backend.pickeat.domain.repository.ParticipantJpaRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatJpaRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatResultRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantJpaRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeJpaRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PickeatScheduler {

    private static final int DELETE_CUT_LINE = 3;

    private final PickeatJpaRepository pickeatJpaRepository;
    private final PickeatResultRepository pickeatResultRepository;
    private final ParticipantJpaRepository participantJpaRepository;
    private final RestaurantLikeJpaRepository restaurantLikeRepository;
    private final RestaurantJpaRepository restaurantJpaRepository;

    @Scheduled(cron = "0 0 0 * * *") // 매일 00:00에 실행
    @Transactional
    public void cleanupOldPickeats() {
        LocalDate targetDate = LocalDate.now().minusDays(DELETE_CUT_LINE);
        LocalDateTime startOfDay = targetDate.atStartOfDay();
        LocalDateTime endOfDay = targetDate.atTime(LocalTime.MAX);

        List<Long> expiredPickeatIds = pickeatJpaRepository.findByUpdatedAtBetween(startOfDay, endOfDay).stream()
                .map(BaseEntity::getId)
                .toList();

        if (expiredPickeatIds.isEmpty()) {
            return;
        }

        deleteRelatedData(expiredPickeatIds);
        restaurantJpaRepository.bulkSoftDeleteByPickeatIdIn(expiredPickeatIds);
        pickeatJpaRepository.bulkSoftDeleteByIdIn(expiredPickeatIds);
    }

    private void deleteRelatedData(List<Long> expiredPickeatIds) {
        List<Long> restaurantIds = restaurantJpaRepository.findByPickeatIdIn(expiredPickeatIds).stream()
                .map(BaseEntity::getId)
                .toList();

        restaurantLikeRepository.bulkSoftDeleteByRestaurantIdIn(restaurantIds);
        pickeatResultRepository.bulkSoftDeleteByPickeatIdIn(expiredPickeatIds);
        participantJpaRepository.bulkSoftDeleteByPickeatIdIn(expiredPickeatIds);
    }
}
