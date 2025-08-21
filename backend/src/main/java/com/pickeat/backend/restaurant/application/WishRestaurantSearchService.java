package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishPictureRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishRestaurantSearchService {

    private final WishListRepository wishListRepository;
    private final WishRepository wishRepository;
    private final WishPictureRepository wishPictureRepository;

    public List<RestaurantRequest> searchByWish(WishRestaurantRequest request) {
        WishList wishList = getWishList(request);

        List<Wish> wishes = wishRepository.findAllByWishList(wishList);
        validateWishExists(wishes);

        return wishes.stream()
                .map(wish -> RestaurantRequest.fromWish(wish, getPictureUrls(wish)))
                .toList();
    }

    private void validateWishExists(List<Wish> wishes) {
        //TODO: 앞서 생성된 픽잇 삭제하는 보상 트랜잭션 필요  (2025-08-21, 목, 11:36)
        if (wishes.isEmpty()) {
            throw new BusinessException(ErrorCode.WISH_LIST_HAS_NO_WISHES);
        }
    }

    private WishList getWishList(WishRestaurantRequest request) {
        return wishListRepository.findById(request.wishListId())
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_LIST_NOT_FOUND));
    }

    private String getPictureUrls(Wish wish) {
        return wishPictureRepository.findAllByWish(wish).stream()
                .map(WishPicture::getDownloadUrl)
                .collect(Collectors.joining(","));
    }
}
