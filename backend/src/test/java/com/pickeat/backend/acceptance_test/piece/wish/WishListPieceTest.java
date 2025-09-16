package com.pickeat.backend.acceptance_test.piece.wish;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
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
                .as(new TypeRef<>() {});
    }
}
