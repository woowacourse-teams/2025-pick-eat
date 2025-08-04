package com.pickeat.backend.wish.ui;

import com.pickeat.backend.wish.application.WishPictureService;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.ui.api.WishPictureApiSpec;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class WishPictureController implements WishPictureApiSpec {

    private final WishPictureService wishPictureService;

    @PostMapping(value = "/wish/{wishId}/wishpictures", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<WishPictureResponse>> createWishPictures(
            @PathVariable("wishId") Long wishId,
            @RequestPart("wishPictures") List<MultipartFile> wishPictures
    ) {
        List<WishPictureResponse> wishPictureResponses = wishPictureService.createWishPicture(wishId, wishPictures);
        return ResponseEntity.status(HttpStatus.CREATED).body(wishPictureResponses);
    }
}
