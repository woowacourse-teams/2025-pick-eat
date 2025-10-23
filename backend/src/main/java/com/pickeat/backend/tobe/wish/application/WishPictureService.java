package com.pickeat.backend.tobe.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.domain.Picture;
import com.pickeat.backend.restaurant.domain.RestaurantInfo;
import com.pickeat.backend.tobe.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.tobe.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.repository.WishRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service("WishPictureServiceV2")
@Transactional(readOnly = true)
public class WishPictureService {

    private static final List<String> ALLOWED_IMAGE_TYPE = List.of("image/jpeg", "image/png", "image/webp");

    private final WishRepository wishRepository;
    private final RoomUserRepository roomUserRepository;
    private final ImageUploadClient imageUploadClient;

    public WishPictureService(
            WishRepository wishRepository,
            RoomUserRepository roomUserRepository,
            @Qualifier("ImageUploadClientV2") ImageUploadClient imageUploadClient
    ) {
        this.wishRepository = wishRepository;
        this.roomUserRepository = roomUserRepository;
        this.imageUploadClient = imageUploadClient;
    }

    @Transactional
    public WishPictureResponse createWishPicture(Long wishId, Long userId, MultipartFile picture) {
        validateWishPictureFormat(picture);
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);

        ImageRequest uploadedResult = uploadWishPictures(picture);
        changeWishPicture(wish, uploadedResult);
        return WishPictureResponse.from(wish);
    }

    @Transactional
    public void deleteWishPictures(Long wishId, Long userId) {
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);
        deleteWishPicture(wish);
        //TODO: cascade로 함께 삭제되는 WishPicture에 해당하는 이미지를 S3에서 제거  (2025-08-12, 화, 13:3)
    }

    @Transactional
    public WishPictureResponse updateWishPictures(Long wishId, Long userId, MultipartFile picture) {
        validateWishPictureFormat(picture);
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);

        deleteWishPicture(wish);
        ImageRequest uploadedResult = uploadWishPictures(picture);
        changeWishPicture(wish, uploadedResult);
        return WishPictureResponse.from(wish);
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private ImageRequest uploadWishPictures(MultipartFile picture) {
        return imageUploadClient.uploadImage(picture);
    }

    private void changeWishPicture(Wish wish, ImageRequest uploadedResult) {
        RestaurantInfo originRestaurantInfo = wish.getRestaurantInfo();
        RestaurantInfo newRestaurantInfo = new RestaurantInfo(
                originRestaurantInfo.getName(),
                originRestaurantInfo.getFoodCategory(),
                originRestaurantInfo.getDistance(),
                originRestaurantInfo.getRoadAddressName(),
                originRestaurantInfo.getPlaceUrl(),
                originRestaurantInfo.getTags(),
                new Picture(uploadedResult.key(), uploadedResult.downloadUrl()));
        wish.updateRestaurantInfo(newRestaurantInfo);
    }

    private void deleteWishPicture(Wish wish) {
        RestaurantInfo originRestaurantInfo = wish.getRestaurantInfo();
        RestaurantInfo newRestaurantInfo = new RestaurantInfo(
                originRestaurantInfo.getName(),
                originRestaurantInfo.getFoodCategory(),
                originRestaurantInfo.getDistance(),
                originRestaurantInfo.getRoadAddressName(),
                originRestaurantInfo.getPlaceUrl(),
                originRestaurantInfo.getTags(),
                null);
        wish.updateRestaurantInfo(newRestaurantInfo);
    }

    private void validateWishPictureFormat(MultipartFile picture) {
        if (!ALLOWED_IMAGE_TYPE.contains(picture.getContentType())) {
            throw new BusinessException(ErrorCode.NOT_ALLOWED_CONTENT_TYPE);
        }
    }

    private void validateUserAccessToWish(Wish wish, Long userId) {
        Long roomId = wish.getRoom().getId();
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_PICTURE_ACCESS_DENIED);
        }
    }
}
