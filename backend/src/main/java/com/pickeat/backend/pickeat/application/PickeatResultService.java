package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Participant;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.PickeatResult;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatResultRepository;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.Restaurants;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PickeatResultService {

    private final PickeatRepository pickeatRepository;
    private final RestaurantRepository restaurantRepository;
    private final ParticipantRepository participantRepository;
    private final PickeatResultRepository pickeatResultRepository;

    @Transactional
    public RestaurantResultResponse createPickeatResult(String pickeatCode, Long participantId) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        validateParticipantAccessToPickeat(participantId, pickeat);

        return pickeatResultRepository.findByPickeatId(pickeat.getId())
                .map(this::convertToResponse)
                .orElseGet(() -> createNewResultWithConcurrencyHandling(pickeat));
    }

    public RestaurantResultResponse getPickeatResult(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        PickeatResult pickeatResult = getPickeatResultByPickeat(pickeat);

        return convertToResponse(pickeatResult);
    }

    private RestaurantResultResponse createNewResultWithConcurrencyHandling(Pickeat pickeat) {
        try {
            pickeat.deactivate();
            return createNewPickeatResult(pickeat);
        } catch (DataIntegrityViolationException e) {
            PickeatResult existingResult = getPickeatResultByPickeat(pickeat);
            return convertToResponse(existingResult);
        }
    }

    private RestaurantResultResponse createNewPickeatResult(Pickeat pickeat) {
        List<Restaurant> availableRestaurants =
                restaurantRepository.findAllByPickeatIdAndIsExcluded(pickeat.getId(), false);

        Restaurants restaurants = new Restaurants(availableRestaurants);
        Restaurant selectedRestaurant = restaurants.getRandomTopRatedRestaurant();

        PickeatResult newResult = new PickeatResult(pickeat.getId(), selectedRestaurant.getId());
        PickeatResult savedResult = pickeatResultRepository.save(newResult);

        return convertToResponse(savedResult);
    }

    private RestaurantResultResponse convertToResponse(PickeatResult result) {
        Restaurant restaurant = getRestaurant(result.getRestaurantId());
        return RestaurantResultResponse.of(restaurant);
    }

    private Restaurant getRestaurant(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESTAURANT_NOT_FOUND));
    }

    private PickeatResult getPickeatResultByPickeat(Pickeat pickeat) {
        return pickeatResultRepository.findByPickeatId(pickeat.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND));
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        PickeatCode code = new PickeatCode(pickeatCode);
        return pickeatRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    private void validateParticipantAccessToPickeat(Long participantId, Pickeat pickeat) {
        Participant participant = getParticipant(participantId);
        if (!participant.getPickeatId().equals(pickeat.getId())) {
            throw new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);
        }
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }
}
