package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishListService;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
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
public class WishListController {

    private final WishListService wishListService;

    @PostMapping("/room/{roomId}/wishLists")
    public ResponseEntity<Void> createWishList(
            @PathVariable("roomId") Long roomId,
            @Valid @RequestBody WishListRequest request
    ) {
        wishListService.createWishList(roomId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/room/{roomId}/wishLists")
    public ResponseEntity<List<WishListResponse>> getWishLists(@PathVariable("roomId") Long roomId) {
        List<WishListResponse> wishLists = wishListService.getWishLists(roomId);
        return ResponseEntity.ok(wishLists);
    }

    @GetMapping("/wishLists/{wishListId}/wishes")
    public ResponseEntity<List<WishResponse>> getWishesInWishList(@PathVariable("wishListId") Long wishListId) {
        List<WishResponse> wishes = wishListService.getWishes(wishListId);
        return ResponseEntity.ok(wishes);
    }
}
