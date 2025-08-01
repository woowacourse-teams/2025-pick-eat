package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.domain.Location;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.Radius;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.Restaurants;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PickeatService {

    private final PickeatRepository pickeatRepository;
    private final RestaurantRepository restaurantRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public PickeatResponse createPickeat(PickeatRequest request) {
        Pickeat pickeat = new Pickeat(
                request.name(),
                new Location(request.x(), request.y()),
                new Radius(request.radius())
        );

        Pickeat saved = pickeatRepository.save(pickeat);
        return PickeatResponse.from(saved);
    }

    @Transactional
    public void deactivatePickeat(String pickeatCode) {
        Pickeat pickeat = findPickeatByCode(pickeatCode);
        pickeat.deactivate();
    }

    public ParticipantStateResponse getParticipantStateSummary(String pickeatCode) {
        Pickeat pickeat = findPickeatByCode(pickeatCode);
        int eliminatedCount = participantRepository.countEliminatedByPickeat(pickeat.getId(), true);
        return ParticipantStateResponse.of(pickeat.getParticipantCount(), eliminatedCount);
    }

    public PickeatResponse getPickeat(String pickeatCode) {
        Pickeat pickeat = findPickeatByCode(pickeatCode);
        return PickeatResponse.from(pickeat);
    }

    public List<RestaurantResponse> getPickeatResult(String pickeatCode) {
        Pickeat pickeat = findPickeatByCode(pickeatCode);
        Restaurants restaurants = new Restaurants(restaurantRepository.findAllByPickeatAndIsExcluded(pickeat, false));
        return RestaurantResponse.from(restaurants.getTopRestaurants());
    }

    private Pickeat findPickeatByCode(String pickeatCode) {
        PickeatCode code = new PickeatCode(pickeatCode);
        return pickeatRepository.findByCode(code)
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }

    public List<RestaurantResponse> getPickeatRestaurants(String pickeatCode, Boolean isExcluded) {
        Pickeat pickeat = findPickeatByCode(pickeatCode);
        return RestaurantResponse.from(restaurantRepository.findByPickeatAndIsExcludedIfProvided(pickeat, isExcluded));
    }
}
