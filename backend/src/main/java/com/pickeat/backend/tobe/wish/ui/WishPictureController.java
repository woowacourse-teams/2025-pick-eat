package com.pickeat.backend.tobe.wish.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.tobe.wish.application.WishPictureService;
import com.pickeat.backend.tobe.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.tobe.wish.ui.api.WishPictureApiSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController("WishPictureControllerV2")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class WishPictureController implements WishPictureApiSpec {

    private final WishPictureService wishPictureService;

    @Override
    @BusinessLogging("위시 사진 생성")
    @PostMapping(value = "/wish/{wishId}/wishpictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WishPictureResponse> createWishPictures(
            @PathVariable("wishId") Long wishId,
            @RequestPart("wishPictures") MultipartFile wishPicture,
            @LoginUserId Long userId
    ) {
        WishPictureResponse wishPictureResponse =
                wishPictureService.createWishPicture(wishId, userId, wishPicture);
        return ResponseEntity.status(HttpStatus.CREATED).body(wishPictureResponse);
    }

    @Override
    @BusinessLogging("위시 사진 삭제")
    @DeleteMapping("/wish/{wishId}/wishpictures")
    public ResponseEntity<Void> deleteWishPictures(
            @PathVariable("wishId") Long wishId,
            @LoginUserId Long userId
    ) {
        wishPictureService.deleteWishPictures(wishId, userId);
        return ResponseEntity.noContent().build();
    }
}
