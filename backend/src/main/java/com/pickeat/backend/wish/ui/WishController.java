package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import jakarta.validation.Valid;
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
public class WishController {

    private final WishService wishService;

    @PostMapping(value = "/wishLists/{wishListId}/wishes", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> createWish(
            @PathVariable("wishListId") Long wishListId,
            @Valid @ModelAttribute WishRequest request
    ) {
        //TODO: s3 이미지 저장 로직 추가  (2025-08-1, 금, 15:57)
        wishService.createWish(wishListId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/wishes/{wishId}")
    public ResponseEntity<Void> deleteWish(@PathVariable("wishId") Long wishId) {
        wishService.deleteWish(wishId);
        return ResponseEntity.noContent().build();
    }
}
