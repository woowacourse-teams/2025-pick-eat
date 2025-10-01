package com.pickeat.backend.tobe.wish.ui;

import com.pickeat.backend.global.auth.annotation.LoginUserId;
import com.pickeat.backend.global.log.BusinessLogging;
import com.pickeat.backend.tobe.wish.application.WishService;
import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
import com.pickeat.backend.tobe.wish.ui.api.WishApiSpec;
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

@RestController("WishControllerV2")
@RequestMapping("/api/v2")
@RequiredArgsConstructor
public class WishController implements WishApiSpec {

    private final WishService wishService;

    @Override
    @BusinessLogging("위시 생성")
    @PostMapping(value = "/rooms/{roomId}/wishes")
    public ResponseEntity<WishResponse> createWish(
            @PathVariable("roomId") Long roomId,
            @Valid @RequestBody WishRequest request,
            @LoginUserId Long userId
    ) {
        WishResponse wishResponse = wishService.createWish(roomId, request, userId);
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
    @GetMapping("/rooms/{roomId}/wishes")
    public ResponseEntity<List<WishResponse>> getWishesInRoom(
            @PathVariable("roomId") Long roomId,
            @LoginUserId Long loginUserId
    ) {
        List<WishResponse> wishes = wishService.getWishes(roomId, loginUserId);
        return ResponseEntity.ok(wishes);
    }
}
