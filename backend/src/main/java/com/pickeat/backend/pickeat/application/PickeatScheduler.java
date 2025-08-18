package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class PickeatScheduler {

    private final PickeatRepository pickeatRepository;
    private final RestaurantRepository restaurantRepository;

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정(00:00)에 실행
    @Transactional
    public void cleanupOldDeactivatedPickeats() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(3);
        //Todo: 삭제 스케줄링 결과에 대한 로깅 필요 [2025-08-18 01:12:32]
        int targetPickeatCount = pickeatRepository.countByIsActiveFalseAndUpdatedAtBefore(cutoffDate);

        if (targetPickeatCount == 0) {
            return;
        }

        restaurantRepository.deleteAllByOldDeactivatedPickeats(cutoffDate);
        pickeatRepository.deleteOldDeactivatedPickeats(cutoffDate);
    }
}
