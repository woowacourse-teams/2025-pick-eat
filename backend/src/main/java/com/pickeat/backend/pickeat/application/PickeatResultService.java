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

    public RestaurantResultResponse getPickeatResult(String pickeatCode, Long participantId) {
        validateParticipantAccessToPickeat(participantId, pickeatCode);
        Pickeat pickeat = getPickeatByCode(pickeatCode);

        PickeatResult pickeatResult = getPickeatResult(pickeat);

        return RestaurantResultResponse.from(pickeatResult.getRestaurant(), pickeatResult.isTied());
    }

    @Transactional
    public RestaurantResultResponse createPickeatResult(String pickeatCode, Long participantId) {
        validateParticipantAccessToPickeat(participantId, pickeatCode);
        Pickeat pickeat = getPickeatByCode(pickeatCode);

        return pickeatResultRepository.findByPickeat(pickeat)
                .map(this::convertToResponse)
                .orElseGet(() -> createNewPickeatResult(pickeat));
    }

    private PickeatResult getPickeatResult(Pickeat pickeat) {
        return pickeatResultRepository.findByPickeat(pickeat)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND));
    }

    private void validateParticipantAccessToPickeat(Long participantId, String pickeatCode) {
        Participant participant = getParticipant(participantId);
        Pickeat pickeat = getPickeatByCode(pickeatCode);
        if (!participant.getPickeat().equals(pickeat)) {
            throw new BusinessException(ErrorCode.PICKEAT_ACCESS_DENIED);
        }
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        PickeatCode code = new PickeatCode(pickeatCode);
        return pickeatRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    private Participant getParticipant(Long participantId) {
        return participantRepository.findById(participantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.PARTICIPANT_NOT_FOUND));
    }

    private RestaurantResultResponse convertToResponse(PickeatResult result) {
        return RestaurantResultResponse.from(result.getRestaurant(), result.isTied());
    }

    private RestaurantResultResponse createNewPickeatResult(Pickeat pickeat) {
        List<Restaurant> availableRestaurants =
                restaurantRepository.findAllByPickeatAndIsExcluded(pickeat, false);

        Restaurants restaurants = new Restaurants(availableRestaurants);
        Restaurant selectedRestaurant = restaurants.getRandomRestaurant();
        boolean hasTie = restaurants.isTied();

        PickeatResult newResult = PickeatResult.of(pickeat, selectedRestaurant, hasTie);
        PickeatResult savedResult = pickeatResultRepository.save(newResult);

        return convertToResponse(savedResult);
    }
}
