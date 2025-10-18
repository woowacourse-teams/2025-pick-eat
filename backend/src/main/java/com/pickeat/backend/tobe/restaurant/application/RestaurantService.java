package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.auth.ParticipantInfo;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("RestaurantServiceV2")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;

    @Transactional
    public void create(List<RestaurantRequest> restaurantRequests, String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        List<Restaurant> restaurants = restaurantRequests.stream()
                .map(request -> new Restaurant(
                        request.name(),
                        request.category(),
                        request.distance(),
                        request.roadAddressName(),
                        request.placeUrl(),
                        request.tags(),
                        request.pictureKey(),
                        request.pictureUrl(),
                        request.type(),
                        pickeat))
                .toList();
        restaurantRepository.bulkInsert(restaurants);
    }

    public List<RestaurantResponse> getPickeatRestaurants(String pickeatCode, Boolean isExcluded, Long participantId) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        List<Restaurant> restaurants = restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat,
                isExcluded);
        List<RestaurantResponse> response = new ArrayList<>();

        for (Restaurant restaurant : restaurants) {
            boolean isLiked = existsLike(restaurant.getId(), participantId);
            response.add(RestaurantResponse.of(restaurant, isLiked));
        }
        return response;
    }

    @Transactional
    public void exclude(RestaurantExcludeRequest request, ParticipantInfo participantInfo) {
        Participant participant = getParticipant(participantInfo.id());
        Pickeat pickeat = getPickeatByCode(participantInfo.rawPickeatCode());

        List<Restaurant> restaurantsInPickeat = restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat,
                false);
        List<Restaurant> excludeTargets = restaurantsInPickeat.stream()
                .filter(restaurant -> request.restaurantIds().contains(restaurant.getId()))
                .toList();
        validateParticipantAccessToRestaurants(excludeTargets, participant);

        excludeTargets.forEach(Restaurant::exclude);
        restaurantRepository.bulkInsert(excludeTargets);
    }

    @Transactional
    public void like(Long restaurantId, Long participantId) {
        if (existsLike(restaurantId, participantId)) {
            throw new BusinessException(ErrorCode.PARTICIPANT_RESTAURANT_ALREADY_LIKED);
        }

        Participant participant = getParticipant(participantId);
        Restaurant restaurant = getRestaurantById(restaurantId);
        validateParticipantAccessToRestaurants(List.of(restaurant), participant);
        restaurantLikeRepository.save(new RestaurantLike(participant, restaurant));
        restaurant.like();
    }

    @Transactional
    public void cancelLike(Long restaurantId, Long participantId) {
        if (!existsLike(restaurantId, participantId)) {
            throw new BusinessException(ErrorCode.PARTICIPANT_RESTAURANT_NOT_LIKED);
        }

        restaurantLikeRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);

        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurant.cancelLike();
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }

    private Restaurant getRestaurantById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESTAURANT_NOT_FOUND));

    }

    private boolean existsLike(Long restaurantId, Long participantId) {
        return restaurantLikeRepository.existsByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    private void validateParticipantAccessToRestaurants(List<Restaurant> restaurants, Participant participant) {
        if (restaurants.isEmpty()) {
            return;
        }

        if (restaurants.stream().anyMatch((r -> !r.getPickeat().equals(participant.getPickeat())))) {
            throw new BusinessException(ErrorCode.RESTAURANT_ELIMINATION_FORBIDDEN);
        }
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        return pickeatRepository.findByCode(new PickeatCode(pickeatCode))
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
