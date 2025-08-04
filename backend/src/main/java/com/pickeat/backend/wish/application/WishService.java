package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.request.WishRequests;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
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

    @Transactional
    public List<WishResponse> createWishes(
            Long wishListId,
            WishRequests requests
    ) {
        //TODO: 방 도메인이 완성되면 현재 요청자가 현재 위시 리스트가 포함된 방의 참가지인지 검증 필요(2025-08-1, 금, 16:15)
        WishList wishList = getWishList(wishListId);
        List<Wish> wishes = requests.request().stream()
                .map(request -> saveWish(request, wishList))
                .toList();
        return WishResponse.from(wishes);
    }

    @Transactional
    public void deleteWish(Long wishId) {
        Wish wish = getWish(wishId);
        //TODO: 방 도메인이 완성되면 현재 요청자가 현재 위시 리스트가 포함된 방의 참가지인지 검증 필요(2025-08-1, 금, 16:15)
        wishRepository.delete(wish);
    }

    private WishList getWishList(Long wishListId) {
        return wishListRepository.findById(wishListId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISHLIST_NOT_FOUND));
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private Wish saveWish(WishRequest request, WishList wishList) {
        Wish wish = new Wish(
                request.name(),
                FoodCategory.getCategoryNameBy(request.category()),
                request.roadAddressName(),
                String.join(",", request.tags()),
                wishList
        );
        return wishRepository.save(wish);
    }
}
