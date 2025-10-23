package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.ParticipantLikesRepository;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.tobe.restaurant.application.dto.request.TemplateRestaurantRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("RestaurantSearchFacadeV2")
@RequiredArgsConstructor
public class RestaurantSearchFacade {

    private final LocationRestaurantSearchService locationRestaurantSearchService;
    private final WishRestaurantSearchService wishRestaurantSearchService;
    private final TemplateRestaurantSearchService templateRestaurantSearchService;
    private final RestaurantService restaurantService;
    private final PickeatRepository pickeatRepository;
    private final RestaurantRepository restaurantRepository;
    private final ParticipantLikesRepository participantLikesRepository;

    // Todo: 앞서 생성된 픽잇 삭제하는 작업에 대한 보상 필요[2025-09-25 17:33:13]
    public void searchByLocation(LocationRestaurantRequest request, String pickeatCode) {
        restaurantService.create(locationRestaurantSearchService.searchByLocation(request), pickeatCode);
        warmUpCache(pickeatCode);
    }

    // Todo: 앞서 생성된 픽잇 삭제하는 작업에 대한 보상 필요[2025-09-25 17:33:13]
    public void searchByWish(WishRestaurantRequest request, String pickeatCode) {
        restaurantService.create(wishRestaurantSearchService.searchByWish(request),
                pickeatCode);
        warmUpCache(pickeatCode);
    }

    // Todo: 앞서 생성된 픽잇 삭제하는 작업에 대한 보상 필요[2025-09-25 17:33:13]
    public void searchByTemplate(TemplateRestaurantRequest request, String pickeatCode) {
        restaurantService.create(templateRestaurantSearchService.searchByTemplate(request), pickeatCode);
        warmUpCache(pickeatCode);
    }

    private void warmUpCache(String pickeatCode) {
        Pickeat pickeat = pickeatRepository.findByCode(new PickeatCode(pickeatCode))
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
        List<Restaurant> restaurants = restaurantRepository.findByPickeatId(pickeat.getId());
        for (Restaurant restaurant : restaurants) {
            participantLikesRepository.initial(restaurant.getId());
        }
    }
}
