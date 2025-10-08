package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.tobe.room.domain.repository.RoomRepository;
import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.repository.WishRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("WishRestaurantSearchServiceV2")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishRestaurantSearchService {

    private final WishRepository wishRepository;
    private final RoomRepository roomRepository;

    public List<RestaurantRequest> searchByWish(WishRestaurantRequest request) {
        Room room = getRoom(request);

        List<Wish> wishes = wishRepository.findAllByRoom(room);
        validateWishExists(wishes);

        return wishes.stream()
                .map(RestaurantRequest::fromWish)
                .toList();
    }

    private Room getRoom(WishRestaurantRequest request) {
        return roomRepository.findById(request.roomId())
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_LIST_NOT_FOUND));
    }

    private void validateWishExists(List<Wish> wishes) {
        if (wishes.isEmpty()) {
            throw new BusinessException(ErrorCode.WISH_LIST_HAS_NO_WISHES);
        }
    }
}
