package com.pickeat.backend.acceptance_test.piece.wish;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import java.util.List;
import org.springframework.http.HttpStatus;


public class WishListPieceTest {

    public static List<WishListResponse> 템플릿_위시리스트_조회() {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/wishLists/templates")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body(notNullValue())
                .extract()
                .as(new TypeRef<>() {
                });
    }

    public static WishListResponse 위시리스트_생성(Long roomId, WishListRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/room/{roomId}/wishLists", roomId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .as(WishListResponse.class);
    }

    public static WishListResponse 방의_위시리스트_조회(Long roomId, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v1/room/{roomId}/wishLists", roomId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(WishListResponse.class);
    }
}
