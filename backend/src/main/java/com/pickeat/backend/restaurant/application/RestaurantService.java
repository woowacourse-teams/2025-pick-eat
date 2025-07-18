package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public void exclude(RestaurantExcludeRequest request) {
        //TODO: Room과 연관관계 설정 이후 쿼리 살펴보기 (N+1문제 방지)  (2025-07-18, 금, 16:35)
        //TODO: 보안 고려 - 모든 식당이 동일 Room에 속하는지 고려  (2025-07-18, 금, 16:37)
        //TODO: 보안 고려 - 현재 참가자가 현재 Room에 속하는지 고려  (2025-07-18, 금, 16:38)
        List<Restaurant> restaurants = restaurantRepository.findAllById(request.restaurantIds());
        restaurants.forEach(Restaurant::exclude);
    }

}
