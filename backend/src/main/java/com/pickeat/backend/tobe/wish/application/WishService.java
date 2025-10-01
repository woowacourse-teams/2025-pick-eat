package com.pickeat.backend.tobe.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.tobe.change.RestaurantInfo;
import com.pickeat.backend.tobe.room.domain.Room;
import com.pickeat.backend.tobe.room.domain.repository.RoomRepository;
import com.pickeat.backend.tobe.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.repository.WishRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("WishServiceV2")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishService {

    private final WishRepository wishRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public WishResponse createWish(
            Long roomId,
            WishRequest request,
            Long userId
    ) {
        validateUserAccessToRoom(roomId, userId);
        Room room = getRoom(roomId);
        RestaurantInfo restaurantInfo = new RestaurantInfo(
                request.name(),
                FoodCategory.getCategoryNameBy(request.category()),
                null,
                request.roadAddressName(),
                request.placeUrl(),
                String.join(",", request.tags()),
                null);
        Wish wish = new Wish(room, restaurantInfo);
        Wish saved = wishRepository.save(wish);
        return WishResponse.from(saved);
    }

    @Transactional
    public void deleteWish(Long wishId, Long userId) {
        Wish wish = getWishWithAccessValidation(wishId, userId);
        wishRepository.delete(wish);
        //TODO: 위시 삭제시 위시 이미지 제거  (2025-08-4, 월, 17:59)
    }

    @Transactional
    public WishResponse updateWish(Long wishId, Long userId, WishUpdateRequest request) {
        Wish wish = getWishWithAccessValidation(wishId, userId);
        RestaurantInfo restaurantInfo = new RestaurantInfo(
                request.name(),
                FoodCategory.getCategoryNameBy(request.category()),
                null,
                request.roadAddressName(),
                request.placeUrl(),
                String.join(",", request.tags()),
                null);
        wish.updateRestaurantInfo(restaurantInfo);
        return WishResponse.from(wish);
    }

    public List<WishResponse> getWishes(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);
        Room room = getRoom(roomId);
        List<Wish> wishes = wishRepository.findAllByRoom(room);
        wishes.sort(Comparator.comparing(Wish::getCreatedAt).reversed());
        return WishResponse.from(wishes);
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private Wish getWishWithAccessValidation(Long wishId, Long userId) {
        Wish wish = getWish(wishId);
        Room room = wish.getRoom();
        validateUserAccessToRoom(room.getId(), userId);
        return wish;
    }

    private Room getRoom(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ROOM_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_ACCESS_DENIED);
        }
    }
}
