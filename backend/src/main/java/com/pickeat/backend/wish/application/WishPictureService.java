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
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class WishPictureService {

    private final WishRepository wishRepository;
    private final WishPictureRepository wishPictureRepository;
    private final ImageUploadClient imageUploadClient;

    public List<WishPictureResponse> createWishPicture(Long wishId, List<MultipartFile> pictures) {
        Wish wish = getWish(wishId);
        List<WishPicture> wishPictures = pictures.stream()
                .map(this::tryPictureUpload)
                .filter(Optional::isPresent)
                .map(uploadResult -> saveWishPicture(wish, uploadResult.get()))
                .toList();
        return WishPictureResponse.from(wishPictures);
    }

    private Wish getWish(Long wishId) {
        return wishRepository.findById(wishId)
                .orElseThrow(() -> new BusinessException(ErrorCode.WISH_NOT_FOUND));
    }

    private Optional<ImageRequest> tryPictureUpload(MultipartFile image) {
        try {
            return Optional.of(imageUploadClient.uploadImage(image));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    private WishPicture saveWishPicture(Wish wish, ImageRequest uploadResult) {
        WishPicture wishPicture = new WishPicture(wish, uploadResult.key(), uploadResult.downloadUrl());
        return wishPictureRepository.save(wishPicture);
    }
}
