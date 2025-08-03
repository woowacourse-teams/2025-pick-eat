package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishPictureService;
import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.ui.api.WishApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WishController implements WishApiSpec {

    private final WishService wishService;
    private final WishPictureService wishPictureService;

    @Override
    @PostMapping(value = "/wishLists/{wishListId}/wishes", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<WishResponse> createWish(
            @PathVariable("wishListId") Long wishListId,
            //TODO: 이미지가 없을 경우 발생하는 바인딩 예외를 해결하기 위해 리펙토링 필요
            // (@RequestPart 활용하면 해결이 가능하지만 API 요청 명세를 수정해야함)  (2025-08-3, 일, 17:52)
            @Valid @ModelAttribute WishRequest request
    ) {
        WishResponse wishResponse = wishService.createWish(wishListId, request);
        List<WishPictureResponse> wishPictureResponses =
                wishPictureService.createWishPicture(wishResponse.id(), request.pictures());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(WishResponse.from(wishResponse, wishPictureResponses));
    }

    @Override
    @DeleteMapping("/wishes/{wishId}")
    public ResponseEntity<Void> deleteWish(@PathVariable("wishId") Long wishId) {
        wishService.deleteWish(wishId);
        return ResponseEntity.noContent().build();
    }
}
