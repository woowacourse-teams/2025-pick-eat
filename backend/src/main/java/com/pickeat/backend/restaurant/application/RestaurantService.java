package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.application.dto.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.domain.Restaurant;
import com.pickeat.backend.restaurant.domain.repository.RestaurantRepository;
import com.pickeat.backend.room.domain.Room;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Transactional
    public void exclude(RestaurantExcludeRequest request) {
        //TODO: 입력된 식당 개수만큼 UPDATE 쿼리가 발생 -> BULK나 배치사이즈를 활용한 최적화 필요  (2025-07-18, 금, 16:35)
        //TODO: 보안 고려 - 현재 참가자가 현재 Room에 속하는지 고려  (2025-07-18, 금, 16:38)
        List<Restaurant> restaurants = restaurantRepository.findAllById(request.restaurantIds());
        validateAllRestaurantsHaveSameRoom(restaurants);
        restaurants.forEach(Restaurant::exclude);
    }

    @Transactional
    public void like(Long restaurantId) {
        //TODO: 동일 참가자의 중복 like 방지 (2025-07-18, 금, 18:44)
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurant.like();
    }

    @Transactional
    public void cancelLike(Long restaurantId) {
        //TODO: 동일 참가자의 중복 unlike 방지 (2025-07-18, 금, 18:44)
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurant.cancelLike();
    }

    private Restaurant getRestaurantById(Long restaurantId) {
        return restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new BusinessException(ErrorCode.RESTAURANT_NOT_FOUND));

    }

    //TODO: 참가자의 방과 식당의 방이 동일한 지 검증  (2025-07-21, 월, 15:50)
    private void validateAllRestaurantsHaveSameRoom(List<Restaurant> restaurants) {
        if (restaurants.isEmpty()) {
            return;
        }
        Room room = restaurants.getFirst().getRoom();
        restaurants.forEach(restaurant -> restaurant.validateRoom(room));
    }
}
