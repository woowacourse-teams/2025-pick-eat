package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishListService {

    private final WishListRepository wishListRepository;

    //TODO: 현재 요청자가 room에 참가중인 참가지인지 권한 체크 필요  (2025-08-1, 금, 14:20)
    @Transactional
    public WishListResponse createWishList(Long roomId, WishListRequest request) {
        WishList wishList = new WishList(request.name(), roomId, false);
        WishList saved = wishListRepository.save(wishList);
        return WishListResponse.from(saved);
    }

    //TODO: 현재 요청자가 room에 참가중인 참가지인지 권한 체크 필요  (2025-08-1, 금, 14:20)
    public List<WishListResponse> getWishLists(Long roomId) {
        List<WishList> wishLists = new ArrayList<>();
        wishLists.addAll(wishListRepository.findAllByRoomIdAndIsPublic(roomId, false));
        wishLists.addAll(wishListRepository.findAllByIsPublicTrue());
        return WishListResponse.from(wishLists);
    }

    public List<WishResponse> getWishes(Long wishListId) {
        WishList wishList = getWishList(wishListId);
        //TODO: 방 도메인이 완성되면 현재 요청자가 현재 위시 리스트가 포함된 방의 참가지인지 검증 필요(2025-08-1, 금, 16:15)
        return WishResponse.from(wishList.getWishes());
    }

    private WishList getWishList(Long wishListId) {
        return wishListRepository.findById(wishListId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISHLIST_NOT_FOUND));
    }
}
