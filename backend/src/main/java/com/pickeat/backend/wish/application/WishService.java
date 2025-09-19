package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishService {

    private final WishListRepository wishListRepository;
    private final WishRepository wishRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public WishResponse createWish(
            Long wishListId,
            WishRequest request,
            Long userId
    ) {
        WishList wishList = getWishList(wishListId);
        validateUserAccessToRoom(wishList.getRoomId(), userId);
        Wish wish = new Wish(
                request.name(),
                FoodCategory.getCategoryNameBy(request.category()),
                request.roadAddressName(),
                String.join(",", request.tags()),
                request.placeUrl(),
                wishList
        );
        Wish saved = wishRepository.save(wish);
        return WishResponse.from(saved);
    }

    @Transactional
    public void deleteWish(Long wishId, Long userId) {
        Wish wish = getWishWithAccessValidation(wishId, userId);
        //TODO: 위시 삭제시 위시 이미지 제거  (2025-08-4, 월, 17:59)
        wishRepository.delete(wish);
    }

    @Transactional
    public WishResponse updateWish(Long wishId, Long userId, WishUpdateRequest request) {
        Wish wish = getWishWithAccessValidation(wishId, userId);
        wish.updateName(request.name());
        wish.updateFoodCategory(FoodCategory.getCategoryNameBy(request.category()));
        wish.updateRoadAddressName(request.roadAddressName());
        wish.updateTags(String.join(",", request.tags()));
        wish.updatePlaceUrl(request.placeUrl());
        return WishResponse.from(wish);
    }

    public List<WishResponse> getWishes(Long wishListId, Long userId) {
        WishList wishList = getWishList(wishListId);
        if (!wishList.getIsTemplate()) {
            validateUserAccessToRoom(wishList.getRoomId(), userId);
        }
        //TODO: 양방향 조회의 쿼리 확인 후 최적화 필요하면 wishRepository.findAllByWishList  (2025-08-6, 수, 10:8)
        List<Wish> wishes = wishList.getWishes();
        wishes.sort(Comparator.comparing(Wish::getCreatedAt).reversed());
        return WishResponse.from(wishes);
    }

    public List<WishResponse> getWishesFromTemplates(Long wishListId) {
        WishList wishList = getWishList(wishListId);
        validateIsTemplate(wishList);
        //TODO: 양방향 조회의 쿼리 확인 후 최적화 필요하면 wishRepository.findAllByWishList  (2025-08-6, 수, 10:8)
        List<Wish> wishes = wishList.getWishes();
        wishes.sort(Comparator.comparing(Wish::getCreatedAt).reversed());
        return WishResponse.from(wishes);
    }

    private WishList getWishList(Long wishListId) {
        return wishListRepository.findById(wishListId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_LIST_NOT_FOUND));
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private Wish getWishWithAccessValidation(Long wishId, Long userId) {
        Wish wish = getWish(wishId);
        WishList wishList = wish.getWishList();
        validateUserAccessToRoom(wishList.getRoomId(), userId);
        return wish;
    }

    private void validateIsTemplate(WishList wishList) {
        if (!wishList.getIsTemplate()) {
            throw new BusinessException(ErrorCode.NOT_PUBLIC_WISH_LIST);
        }
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_ACCESS_DENIED);
        }
    }
}
