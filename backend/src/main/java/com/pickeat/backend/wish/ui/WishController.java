package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishPictureService;
import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishRequests;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.wish.ui.api.WishApiSpec;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WishController implements WishApiSpec {

    private final WishService wishService;
    private final WishPictureService wishPictureService;

    @PostMapping(value = "/wishLists/{wishListId}/wishes")
    public ResponseEntity<List<WishResponse>> createWishes(
            @PathVariable("wishListId") Long wishListId,
            @Valid @RequestBody WishRequests requests
    ) {
        List<WishResponse> wishResponses = wishService.createWishes(wishListId, requests);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(wishResponses);
    }

    @Override
    @DeleteMapping("/wishes/{wishId}")
    public ResponseEntity<Void> deleteWish(@PathVariable("wishId") Long wishId) {
        wishService.deleteWish(wishId);
        return ResponseEntity.noContent().build();
    }
}
