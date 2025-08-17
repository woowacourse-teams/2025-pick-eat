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

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void cleanupOldDeactivatedPickeats() {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(3);

        int targetPickeatCount = pickeatRepository.countByIsActiveFalseAndUpdatedAtBefore(cutoffDate);

        if (targetPickeatCount == 0) {
            log.info("Cleanup skipped - no records older than {}", cutoffDate.toLocalDate());
            return;
        }

        log.info("Cleanup started - {} records to delete (cutoff: {})",
                targetPickeatCount, cutoffDate.toLocalDate());

        int deletedRestaurantCount = restaurantRepository.deleteAllByOldDeactivatedPickeats(cutoffDate);
        int deletedPickeatCount = pickeatRepository.deleteOldDeactivatedPickeats(cutoffDate);

        log.info("Cleanup completed - deleted: {} pickeats, {} restaurants",
                deletedPickeatCount, deletedRestaurantCount);
    }
}
