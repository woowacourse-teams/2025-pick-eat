package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishRestaurantSearchService {

    private final WishRepository wishRepository;

    public List<RestaurantRequest> searchByWish(WishRestaurantRequest request) {
        List<Wish> wishes = wishRepository.findAllByRoomId(request.roomId());
        validateWishExists(wishes);

        return wishes.stream()
                .map(RestaurantRequest::fromWish)
                .toList();
    }

    private void validateWishExists(List<Wish> wishes) {
        if (wishes.isEmpty()) {
            throw new BusinessException(ErrorCode.ROOM_HAS_NO_WISHES);
        }
    }
}
