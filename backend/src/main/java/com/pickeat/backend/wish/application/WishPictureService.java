package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.wish.application.dto.request.ImageRequest;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishPictureRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishPictureService {

    private static final List<String> ALLOWED_IMAGE_TYPE = List.of("image/jpeg", "image/png", "image/webp");

    private final WishRepository wishRepository;
    private final WishPictureRepository wishPictureRepository;
    private final RoomUserRepository roomUserRepository;
    private final ImageUploadClient imageUploadClient;

    @Transactional
    public List<WishPictureResponse> createWishPicture(Long wishId, Long userId, List<MultipartFile> pictures) {
        validateWishPictureFormat(pictures);
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);

        List<ImageRequest> uploadedResults = uploadWishPictures(pictures);
        List<WishPicture> wishPictures = saveWishPictures(wish, uploadedResults);
        return WishPictureResponse.from(wishPictures);
    }

    @Transactional
    public void deleteWishPictures(Long wishId, Long userId) {
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);
        deleteWishPicturesInWish(wish);
        //TODO: cascade로 함께 삭제되는 WishPicture에 해당하는 이미지를 S3에서 제거  (2025-08-12, 화, 13:3)
    }

    @Transactional
    public List<WishPictureResponse> updateWishPictures(Long wishId, Long userId, List<MultipartFile> pictures) {
        validateWishPictureFormat(pictures);
        Wish wish = getWish(wishId);
        validateUserAccessToWish(wish, userId);

        deleteWishPicturesInWish(wish);
        List<ImageRequest> uploadedResults = uploadWishPictures(pictures);
        List<WishPicture> wishPictures = saveWishPictures(wish, uploadedResults);
        return WishPictureResponse.from(wishPictures);
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private List<ImageRequest> uploadWishPictures(List<MultipartFile> pictures) {
        return pictures.stream()
                .map(imageUploadClient::uploadImage)
                .toList();
    }

    private List<WishPicture> saveWishPictures(Wish wish, List<ImageRequest> uploadResults) {
        return uploadResults.stream()
                .map(uploadResult -> new WishPicture(wish, uploadResult.key(), uploadResult.downloadUrl()))
                .map(wishPictureRepository::save)
                .toList();
    }

    private void deleteWishPicturesInWish(Wish wish) {
        List<WishPicture> wishPictures = wish.getWishPictures();
        wishPictureRepository.deleteAll(wishPictures);
    }

    private void validateWishPictureFormat(List<MultipartFile> pictures) {
        for (MultipartFile picture : pictures) {
            if (!ALLOWED_IMAGE_TYPE.contains(picture.getContentType())) {
                throw new BusinessException(ErrorCode.NOT_ALLOWED_CONTENT_TYPE);
            }
        }
    }

    private void validateUserAccessToWish(Wish wish, Long userId) {
        Long roomId = wish.getWishList().getRoomId();
        if (!roomUserRepository.existsByRoomIdAndUserId(roomId, userId)) {
            throw new BusinessException(ErrorCode.WISH_PICTURE_ACCESS_DENIED);
        }
    }
}
