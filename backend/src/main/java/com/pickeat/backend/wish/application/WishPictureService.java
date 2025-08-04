package com.pickeat.backend.wish.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
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
    private final ImageUploadClient imageUploadClient;

    @Transactional
    public List<WishPictureResponse> createWishPicture(Long wishId, List<MultipartFile> pictures) {
        validateWishPictureFormat(pictures);
        Wish wish = getWish(wishId);
        //TODO: 이미지 업로드 실패시 이미 업로드된 이미지 제거 필요 (2025-08-4, 월, 17:46)
        List<WishPicture> wishPictures = pictures.stream()
                .map(imageUploadClient::uploadImage)
                .map(uploadResult -> saveWishPicture(wish, uploadResult))
                .toList();
        return WishPictureResponse.from(wishPictures);
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private WishPicture saveWishPicture(Wish wish, ImageRequest uploadResult) {
        WishPicture wishPicture = new WishPicture(wish, uploadResult.key(), uploadResult.downloadUrl());
        return wishPictureRepository.save(wishPicture);
    }

    private void validateWishPictureFormat(List<MultipartFile> pictures) {
        for (MultipartFile picture : pictures) {
            if (!ALLOWED_IMAGE_TYPE.contains(picture.getContentType())) {
                throw new BusinessException(ErrorCode.NOT_ALLOWED_CONTENT_TYPE);
            }
        }
    }
}
