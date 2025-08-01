package com.pickeat.backend.wish.application;

import com.pickeat.backend.wish.application.dto.response.WishListResponse;
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
    public List<WishListResponse> getWishLists(Long roomId) {
        List<WishList> wishLists = new ArrayList<>();
        wishLists.addAll(wishListRepository.findAllByIsPublicFalseAndRoomId(roomId));
        wishLists.addAll(wishListRepository.findAllByIsPublicTrue());
        return WishListResponse.from(wishLists);
    }
}
