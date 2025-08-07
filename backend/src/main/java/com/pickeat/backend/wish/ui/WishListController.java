package com.pickeat.backend.wish.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.wish.application.WishListService;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.ui.api.WishListApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<WishListResponse>> getWishLists(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long userId
    ) {
        List<WishListResponse> wishLists = wishListService.getWishLists(roomId, userId);
        return ResponseEntity.ok(wishLists);
    }

    @Override
    @GetMapping("/wishLists")
    public ResponseEntity<List<WishListResponse>> getPublicWishLists() {
        List<WishListResponse> wishLists = wishListService.getPublicWishLists();
        return ResponseEntity.ok(wishLists);
    }
}
