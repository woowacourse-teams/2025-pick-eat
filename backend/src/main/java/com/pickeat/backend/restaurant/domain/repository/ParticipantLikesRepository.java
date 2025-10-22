package com.pickeat.backend.restaurant.domain.repository;

import com.pickeat.backend.global.cache.CacheNames;
import com.pickeat.backend.restaurant.domain.ParticipantLikes;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ParticipantLikesRepository {
    private final RestaurantLikeJpaRepository restaurantLikeJpaRepository;

    @Cacheable(value = CacheNames.PARTICIPANT_LIKE, key = "#restaurantId")
    public ParticipantLikes initial(Long restaurantId) {
        return new ParticipantLikes();
    }

    @Cacheable(value = CacheNames.PARTICIPANT_LIKE, key = "#restaurantId")
    public ParticipantLikes findByRestaurantId(Long restaurantId) {
        List<RestaurantLike> restaurantLikes = restaurantLikeJpaRepository.findAllByRestaurantId(restaurantId);
        List<Long> participantIds = restaurantLikes.stream()
                .map(RestaurantLike::getParticipantId)
                .toList();

        ParticipantLikes participantLikes = new ParticipantLikes();
        participantLikes.addAll(participantIds);
        return participantLikes;
    }
}
