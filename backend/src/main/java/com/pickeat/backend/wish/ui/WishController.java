package com.pickeat.backend.wish.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.config.annotation.DeprecatedApi;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.ui.api.WishApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Deprecated
@DeprecatedApi(
        since = "Fri, 24 Oct 2025 23:59:59 GMT",
        sunset = "Fri, 28 Nov 2025 23:59:59 GMT",
        alternateUrl = "/api/v2/wishes"
)
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class WishController implements WishApiSpec {

    private final WishService wishService;

    @Override
    @BusinessLogging("위시 생성")
    @PostMapping(value = "/wishLists/{wishListId}/wishes")
    public ResponseEntity<WishResponse> createWish(
            @PathVariable("wishListId") Long wishListId,
            @Valid @RequestBody WishRequest request,
            @LoginUserId Long userId
    ) {
        WishResponse wishResponse = wishService.createWish(wishListId, request, userId);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishResponse);
    }

    @Override
    @BusinessLogging("위시 삭제")
    @DeleteMapping("/wishes/{wishId}")
    public ResponseEntity<Void> deleteWish(@PathVariable("wishId") Long wishId, @LoginUserId Long userId) {
        wishService.deleteWish(wishId, userId);
        return ResponseEntity.noContent().build();
    }

    @Override
    @BusinessLogging("위시 수정")
    @PutMapping("/wishes/{wishId}")
    public ResponseEntity<WishResponse> updateWish(
            @PathVariable("wishId") Long wishId,
            @Valid @RequestBody WishUpdateRequest request,
            @LoginUserId Long userId
    ) {
        WishResponse updated = wishService.updateWish(wishId, userId, request);
        return ResponseEntity.ok(updated);
    }

    @Override
    @GetMapping("/wishLists/{wishListId}/wishes")
    public ResponseEntity<List<WishResponse>> getWishesInWishList(
            @PathVariable("wishListId") Long wishListId,
            @LoginUserId Long loginUserId
    ) {
        List<WishResponse> wishes = wishService.getWishes(wishListId, loginUserId);
        return ResponseEntity.ok(wishes);
    }

    @Override
    @GetMapping("/wishLists/templates/{wishListId}/wishes")
    public ResponseEntity<List<WishResponse>> getWishesInTemplates(
            @PathVariable("wishListId") Long wishListId
    ) {
        List<WishResponse> wishes = wishService.getWishesFromTemplates(wishListId);
        return ResponseEntity.ok(wishes);
    }
}
