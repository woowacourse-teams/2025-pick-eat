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

    @Transactional
    public RestaurantResultResponse createPickeatResult(String pickeatCode, Long participantId) {
        validateParticipantAccessToPickeat(participantId, pickeatCode);
        Pickeat pickeat = getPickeatByCode(pickeatCode);

        if (pickeatResultRepository.findByPickeat(pickeat).isPresent()) {
            throw new BusinessException(ErrorCode.PICKEAT_RESULT_ALREADY_EXISTS);
        }

        List<Restaurant> availableRestaurants =
                restaurantRepository.findAllByPickeatAndIsExcluded(pickeat, false);

        Restaurants restaurants = new Restaurants(availableRestaurants);
        Restaurant randomResult = restaurants.getRandomTopRestaurant();
        boolean isTied = restaurants.isTied();

        PickeatResult pickeatResult = PickeatResult.of(pickeat, randomResult, isTied);
        PickeatResult savedResult = pickeatResultRepository.save(pickeatResult);

        return RestaurantResultResponse.from(savedResult.getRestaurant(), savedResult.isTied());
    }

    public RestaurantResultResponse getPickeatResult(String pickeatCode, Long participantId) {
        validateParticipantAccessToPickeat(participantId, pickeatCode);
        Pickeat pickeat = getPickeatByCode(pickeatCode);

        PickeatResult pickeatResult = pickeatResultRepository.findByPickeat(pickeat)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_RESULT_NOT_FOUND));

        return RestaurantResultResponse.from(pickeatResult.getRestaurant(), pickeatResult.isTied());
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
}
