package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishListService {

    private final WishListRepository wishListRepository;
    private final RoomUserRepository roomUserRepository;

    @Transactional
    public WishListResponse createWishList(Long roomId, Long userId, WishListRequest request) {
        WishList wishList = new WishList(request.name(), roomId, false);
        validateUserAccessToRoom(wishList.getRoomId(), userId);
        WishList saved = wishListRepository.save(wishList);
        return WishListResponse.from(saved);
    }

    public List<WishListResponse> getPrivateWishLists(Long roomId, Long userId) {
        validateUserAccessToRoom(roomId, userId);
        List<WishList> wishLists = wishListRepository.findAllByRoomIdAndIsPublic(roomId, false);
        wishLists.sort(Comparator.comparing(WishList::getCreatedAt).reversed());
        return WishListResponse.from(wishLists);
    }

    public List<WishListResponse> getPublicWishLists() {
        List<WishList> publicWishList = wishListRepository.findAllByIsPublicTrue();
        publicWishList.sort(Comparator.comparing(WishList::getCreatedAt).reversed());
        return WishListResponse.from(publicWishList);
    }

    @Transactional
    public void deleteWishList(Long wishListId, Long userId) {
        WishList wishList = getWishList(wishListId);
        validateUserAccessToRoom(wishList.getRoomId(), userId);
        wishListRepository.delete(wishList);
        //TODO: cascade로 함께 삭제되는 WishPicture에 해당하는 이미지를 S3에서 제거  (2025-08-12, 화, 13:3)
    }

    private WishList getWishList(Long wishListId) {
        return wishListRepository.findById(wishListId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_LIST_NOT_FOUND));
    }

    private void validateUserAccessToRoom(Long roomId, Long userId) {
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_LIST_ACCESS_DENIED);
        }
    }
}
