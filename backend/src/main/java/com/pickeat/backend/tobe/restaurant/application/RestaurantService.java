package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.auth.principal.ParticipantPrincipal;
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
import com.pickeat.backend.restaurant.domain.repository.RestaurantLikeRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.restaurant.infrastructure.RestaurantJdbcRepository;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("RestaurantServiceV2")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantJdbcRepository restaurantJdbcRepository;
    private final PickeatRepository pickeatRepository;
    private final ParticipantRepository participantRepository;
    private final RestaurantLikeRepository restaurantLikeRepository;

    //TODO: 생성 시점에 미리 캐싱하는 전략 취할수도  (2025-10-20, 월, 19:36)
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
        restaurantJdbcRepository.batchInsert(restaurants);
    }

    public List<RestaurantResponse> getPickeatRestaurants(String pickeatCode, Boolean isExcluded, Long participantId) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
        List<Restaurant> targets = getTargets(restaurants, isExcluded);
        Set<Long> likedRestaurantIds = getLikedRestaurantIdsByParticipantId(participantId);

        List<RestaurantResponse> response = new ArrayList<>();
        for (Restaurant restaurant : targets) {
            boolean isLiked = likedRestaurantIds.contains(restaurant.getId());
            Integer likeCount = restaurantLikeRepository.countAllByRestaurantId(restaurant.getId());
            response.add(RestaurantResponse.of(restaurant, likeCount, isLiked));
        }
        return response;
    }

    @Transactional
    public void exclude(RestaurantExcludeRequest request, ParticipantPrincipal participantPrincipal) {
        Pickeat pickeat = getPickeatByCode(participantPrincipal.rawPickeatCode());
        validatePickeatState(pickeat);

        List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
        List<Long> targetIds = request.restaurantIds();

        List<Restaurant> targets = restaurants.stream()
                .filter(restaurant -> targetIds.contains(restaurant.getId()))
                .toList();

        targets.forEach(Restaurant::exclude);
        restaurantRepository.saveAll(restaurants);
    }

    @Transactional
    public void like(Long restaurantId, Long participantId) {
        if (existsLike(restaurantId, participantId)) {
            throw new BusinessException(ErrorCode.PARTICIPANT_RESTAURANT_ALREADY_LIKED);
        }

        Participant participant = getParticipant(participantId);
        Restaurant restaurant = getRestaurantById(restaurantId);
        validateParticipantAccessToRestaurants(List.of(restaurant), participant);
        restaurantLikeRepository.save(new RestaurantLike(participant.getId(), restaurant.getId()));
    }

    @Transactional
    public void cancelLike(Long restaurantId, Long participantId) {
        restaurantLikeRepository.deleteByRestaurantIdAndParticipantId(restaurantId, participantId);
    }

    private Set<Long> getLikedRestaurantIdsByParticipantId(Long participantId) {
        return restaurantLikeRepository.findAllByParticipantId(participantId)
                .stream()
                .map(RestaurantLike::getRestaurantId)
                .collect(Collectors.toSet());
    }

    private List<Restaurant> getTargets(List<Restaurant> restaurants, Boolean isExcluded) {
        if (isExcluded == null) {
            return restaurants;
        }

        return restaurants.stream()
                .filter(restaurant -> restaurant.getIsExcluded().equals(isExcluded))
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

        if (restaurants.stream().anyMatch((r -> !r.getPickeatId().equals(participant.getPickeatId())))) {
            throw new BusinessException(ErrorCode.RESTAURANT_ELIMINATION_FORBIDDEN);
        }
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        return pickeatRepository.findByCode(new PickeatCode(pickeatCode))
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
