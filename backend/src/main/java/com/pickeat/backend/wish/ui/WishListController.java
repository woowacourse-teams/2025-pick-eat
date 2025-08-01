package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishListService;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WishListController {

    private final WishListService wishListService;

    @GetMapping("/room/{roomId}/wishLists")
    public ResponseEntity<List<WishListResponse>> getWishLists(@PathVariable("roomId") Long roomId) {
        List<WishListResponse> wishLists = wishListService.getWishLists(roomId);
        return ResponseEntity.ok(wishLists);
    }
}
