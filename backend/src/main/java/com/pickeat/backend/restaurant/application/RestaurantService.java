package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.ParticipantLikes;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.RestaurantLike;
import com.pickeat.backend.restaurant.domain.repository.ParticipantLikesRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;
    private final ParticipantLikesRepository participantLikesRepository;

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
                        pickeat.getId()))
                .toList();
        restaurantRepository.batchInsert(restaurants);
    }

    public List<RestaurantResponse> getPickeatRestaurants(String pickeatCode, Boolean isExcluded, Long participantId) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
        List<Restaurant> targets = getTargets(restaurants, isExcluded);
        List<RestaurantResponse> response = new ArrayList<>();
        for (Restaurant restaurant : targets) {
            ParticipantLikes participantLikes = participantLikesRepository.findByRestaurantId(restaurant.getId());
            int likeCount = participantLikes.getCount();
            boolean isLiked = participantLikes.contains(participantId);
            response.add(RestaurantResponse.of(restaurant, likeCount, isLiked));
        }

        return response;
    }

    @Transactional
    public void exclude(RestaurantExcludeRequest request, ParticipantPrincipal participantPrincipal) {
        Pickeat pickeat = getPickeatByCode(participantPrincipal.rawPickeatCode());
        validatePickeatState(pickeat);

        Participant participant = getParticipant(participantPrincipal.id());
        if (!Objects.equals(participant.getPickeatId(), pickeat.getId())) {
            throw new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);
        }

        List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
        List<Long> targetIds = request.restaurantIds();

        List<Restaurant> targets = restaurants.stream()
                .filter(restaurant -> targetIds.contains(restaurant.getId()))
                .toList();

        targets.forEach(Restaurant::exclude);
        restaurantRepository.saveAll(targets);
    }

    @Transactional
    public void like(Long restaurantId, Long participantId) {
        if (existsLike(restaurantId, participantId)) {
            throw new BusinessException(ErrorCode.PARTICIPANT_RESTAURANT_ALREADY_LIKED);
        }

        Participant participant = getParticipant(participantId);
        Restaurant restaurant = getRestaurantById(restaurantId);
        validateParticipantAccessToRestaurants(List.of(restaurant), participant);
        ParticipantLikes participantLikes = participantLikesRepository.findByRestaurantId(restaurantId);
        restaurantLikeRepository.save(new RestaurantLike(participant.getId(), restaurant.getId()));
        participantLikes.addParticipantId(participantId);
    }

    @Transactional
    public void cancelLike(Long restaurantId, Long participantId) {
        ParticipantLikes participantLikes = participantLikesRepository.findByRestaurantId(restaurantId);
        restaurantLikeRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
        participantLikes.removeParticipantId(participantId);
    }

    private List<Restaurant> getTargets(List<Restaurant> restaurants, Boolean isExcluded) {
        if (isExcluded == null) {
            return restaurants;
        }

        return restaurants.stream()
                .filter(restaurant -> Objects.equals(restaurant.getIsExcluded(), isExcluded))
                .toList();
    }

    private void validatePickeatState(Pickeat pickeat) {
        if (!pickeat.getIsActive()) {
            throw new BusinessException(ErrorCode.PICKEAT_ALREADY_INACTIVE);
        }
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

        if (restaurants.stream()
                .anyMatch((restaurant -> !restaurant.getPickeatId().equals(participant.getPickeatId())))) {
            throw new BusinessException(ErrorCode.RESTAURANT_ELIMINATION_FORBIDDEN);
        }
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        return pickeatRepository.findByCode(new PickeatCode(pickeatCode))
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
