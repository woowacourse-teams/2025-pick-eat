package com.pickeat.backend.pickeat.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.ParticipantRepository;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.domain.Restaurants;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
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
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public PickeatResponse createPickeatWithoutRoom(PickeatRequest request) {
        Pickeat pickeat = Pickeat.createWithoutRoom(request.name());

        pickeatRepository.save(pickeat);
        return PickeatResponse.from(pickeat);
    }

    @Transactional
    public PickeatResponse createPickeatWithRoom(Long roomId, Long userId, PickeatRequest request) {
        validateUserAccessToRoom(roomId, userId);

        Pickeat pickeat = Pickeat.createWithRoom(request.name(), roomId);

        pickeatRepository.save(pickeat);
        return PickeatResponse.from(pickeat);
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

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.ROOM_ACCESS_DENIED);
        }
    }
}
