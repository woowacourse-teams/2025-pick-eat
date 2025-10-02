package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.pickeat.domain.Pickeat;
import com.pickeat.backend.pickeat.domain.PickeatCode;
import com.pickeat.backend.pickeat.domain.repository.PickeatRepository;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.tobe.restaurant.application.request.RestaurantRequest;
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
        restaurantRepository.saveAll(restaurants);
    }

    private Pickeat getPickeatByCode(String pickeatCode) {
        return pickeatRepository.findByCode(new PickeatCode(pickeatCode))
                .orElseThrow(() -> new BusinessException(ErrorCode.PICKEAT_NOT_FOUND));
    }
}
