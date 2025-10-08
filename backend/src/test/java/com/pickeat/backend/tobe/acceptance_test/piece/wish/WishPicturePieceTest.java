package com.pickeat.backend.tobe.acceptance_test.piece.wish;

import com.pickeat.backend.tobe.wish.application.dto.response.WishPictureResponse;
import io.restassured.RestAssured;
import java.io.File;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class WishPicturePieceTest {

    public static WishPictureResponse 위시_사진_생성(Long wishId, File wishPicture, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .multiPart("wishPictures", wishPicture)
                .when()
                .post("/api/v2/wish/{wishId}/wishpictures", wishId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .as(WishPictureResponse.class);
    }

    public static void 위시_사진_삭제(Long wishId, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .delete("/api/v2/wish/{wishId}/wishpictures", wishId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static WishPictureResponse 위시_사진_수정(Long wishId, File wishPicture, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .multiPart("wishPicture", wishPicture)
                .when()
                .put("/api/v2/wish/{wishId}/wishpictures", wishId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(WishPictureResponse.class);
    }
}
