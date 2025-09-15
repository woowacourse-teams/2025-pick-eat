package com.pickeat.backend.wish.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.wish.application.WishListService;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.ui.api.WishListApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WishListController implements WishListApiSpec {

    private final WishListService wishListService;

    @Override
    @BusinessLogging("위시리스트 생성")
    @PostMapping("/room/{roomId}/wishLists")
    public ResponseEntity<WishListResponse> createWishList(
            @PathVariable("roomId") Long roomId,
            @Valid @RequestBody WishListRequest request,
            @LoginUserId Long userId
    ) {
        WishListResponse wishListResponse = wishListService.createWishList(roomId, userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(wishListResponse);
    }

    @Override
    @GetMapping("/room/{roomId}/wishLists")
    public ResponseEntity<WishListResponse> getWishLists(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId
    ) {
        WishListResponse wishLists = wishListService.getWishList(roomId, userId);
        return ResponseEntity.ok(wishLists);
    }

    @Override
    @GetMapping("/wishLists/templates")
    public ResponseEntity<List<WishListResponse>> getTemplateWishLists() {
        List<WishListResponse> wishLists = wishListService.getTemplateWishLists();
        return ResponseEntity.ok(wishLists);
    }

    @Override
    @BusinessLogging("위시리스트 삭제")
    @DeleteMapping("/wishLists/{wishListId}")
    public ResponseEntity<Void> deleteWishList(
            @PathVariable("wishListId") Long wishListId,
            @LoginUserId Long userId
    ) {
        wishListService.deleteWishList(wishListId, userId);
        return ResponseEntity.noContent().build();
    }
}
