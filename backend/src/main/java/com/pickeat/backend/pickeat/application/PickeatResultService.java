package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResultCreationResponse;
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
import com.pickeat.backend.tobe.restaurant.domain.repository.RestaurantRepository;
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
    public PickeatResultCreationResponse createPickeatResult(String pickeatCode, Long participantId) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        validateParticipantAccessToPickeat(participantId, pickeat);

        return pickeatResultRepository.findByPickeat(pickeat)
                .map(this::createExistingResultResponse)
                .orElseGet(() -> createNewResultWithConcurrencyHandling(pickeat));
    }

    public RestaurantResultResponse getPickeatResult(String pickeatCode) {
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        PickeatResult pickeatResult = getPickeatResult(pickeat);

        return RestaurantResultResponse.of(pickeatResult.getRestaurant(), pickeatResult.isHasEqualLike());
    }

    private PickeatResultCreationResponse createExistingResultResponse(PickeatResult existingResult) {
        return new PickeatResultCreationResponse(convertToResponse(existingResult), false);
    }

    private PickeatResultCreationResponse createNewResultWithConcurrencyHandling(Pickeat pickeat) {
        try {
            pickeat.deactivate();
            RestaurantResultResponse newResult = createNewPickeatResult(pickeat);
            return new PickeatResultCreationResponse(newResult, true);
        } catch (DataIntegrityViolationException e) {
            PickeatResult existingResult = getPickeatResultByPickeat(pickeat);
            return createExistingResultResponse(existingResult);
        }
    }

    private RestaurantResultResponse createNewPickeatResult(Pickeat pickeat) {
        List<Restaurant> availableRestaurants =
                restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, false);

        Restaurants restaurants = new Restaurants(availableRestaurants);
        Restaurant selectedRestaurant = restaurants.getRandomTopRatedRestaurant();
        boolean hasEqualLike = restaurants.hasEqualLike();

        PickeatResult newResult = new PickeatResult(pickeat, selectedRestaurant, hasEqualLike);
        PickeatResult savedResult = pickeatResultRepository.save(newResult);

        return convertToResponse(savedResult);
    }

    private RestaurantResultResponse convertToResponse(PickeatResult result) {
        return RestaurantResultResponse.of(result.getRestaurant(), result.isHasEqualLike());
    }

    private PickeatResult getPickeatResultByPickeat(Pickeat pickeat) {
        return pickeatResultRepository.findByPickeat(pickeat)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND));
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        PickeatCode code = new PickeatCode(pickeatCode);
        return pickeatRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    private PickeatResult getPickeatResult(Pickeat pickeat) {
        return pickeatResultRepository.findByPickeat(pickeat)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND));
    }

    private void validateParticipantAccessToPickeat(Long participantId, Pickeat pickeat) {
        Participant participant = getParticipant(participantId);
        if (!participant.getPickeat().equals(pickeat)) {
            throw new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);
        }
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }
}
