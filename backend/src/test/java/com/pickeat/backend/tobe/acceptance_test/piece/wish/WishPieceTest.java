package com.pickeat.backend.tobe.acceptance_test.piece.wish;

import com.pickeat.backend.tobe.wish.application.dto.request.WishRequest;
import com.pickeat.backend.tobe.wish.application.dto.request.WishUpdateRequest;
import com.pickeat.backend.tobe.wish.application.dto.response.WishResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import java.util.List;
import org.springframework.http.HttpStatus;

public class WishPieceTest {

    public static WishResponse 위시_생성(Long roomId, WishRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/rooms/{roomId}/wishes", roomId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .as(WishResponse.class);
    }

    public static void 위시_삭제(Long wishId, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .delete("/api/v2/wishes/{wishId}", wishId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static WishResponse 위시_수정(Long wishId, WishUpdateRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .put("/api/v2/wishes/{wishId}", wishId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(WishResponse.class);
    }

    public static List<WishResponse> 위시_목록_조회(Long roomId, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v2/rooms/{roomId}/wishes", roomId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<WishResponse>>() {
                });
    }
}
