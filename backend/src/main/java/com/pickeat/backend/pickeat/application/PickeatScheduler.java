package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatResultRepository;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
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

    private final PickeatRepository pickeatRepository;
    private final PickeatResultRepository pickeatResultRepository;
    private final ParticipantRepository participantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;
    private final RestaurantRepository restaurantRepository;

    @Scheduled(cron = "0 0 0 * * *") // 매일 00:00에 실행
    @Transactional
    public void cleanupOldPickeats() {
        LocalDate targetDate = LocalDate.now().minusDays(DELETE_CUT_LINE);
        LocalDateTime startOfDay = targetDate.atStartOfDay();
        LocalDateTime endOfDay = targetDate.atTime(LocalTime.MAX);

        List<Pickeat> expiredPickeats = pickeatRepository.findByUpdatedAtBetween(startOfDay, endOfDay);

        if (expiredPickeats.isEmpty()) {
            return;
        }

        List<Long> expiredPickeatIds = expiredPickeats.stream()
                .map(Pickeat::getId)
                .toList();

        deleteRelatedData(expiredPickeatIds);
        restaurantRepository.deleteByPickeatIds(expiredPickeatIds);
        pickeatRepository.deleteAll(expiredPickeats);
    }

    private void deleteRelatedData(List<Long> expiredPickeatIds) {
        List<RestaurantLike> likesToDelete = restaurantLikeRepository.findByRestaurantPickeatIdIn(expiredPickeatIds);
        List<PickeatResult> resultsToDelete = pickeatResultRepository.findByPickeatIdIn(expiredPickeatIds);
        List<Participant> participantsToDelete = participantRepository.findByPickeatIdIn(expiredPickeatIds);

        restaurantLikeRepository.deleteAll(likesToDelete);
        pickeatResultRepository.deleteAll(resultsToDelete);
        participantRepository.deleteAll(participantsToDelete);
    }
}
