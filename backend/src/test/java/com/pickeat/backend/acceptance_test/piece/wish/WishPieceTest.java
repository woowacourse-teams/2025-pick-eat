package com.pickeat.backend.acceptance_test.piece.wish;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import java.util.List;
import org.springframework.http.HttpStatus;

public class WishPieceTest {

    public static WishResponse 위시_생성(Long wishListId, WishRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/wishLists/{wishListId}/wishes", wishListId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", notNullValue())
                .body("name", notNullValue())
                .body("category", notNullValue())
                .body("roadAddressName", notNullValue())
                .body("wishListId", notNullValue())
                .extract()
                .as(WishResponse.class);
    }

    public static List<WishResponse> 위시리스트에_담긴_위시_조회(Long wishListId, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v1/wishLists/{wishListId}/wishes", wishListId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("$", notNullValue())
                .extract()
                .as(new TypeRef<>() {});
    }
}
