package com.pickeat.backend.tobe.acceptance_test.piece.restaurant;

import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class RestaurantPieceTest {

    public static void 위시_기반_식당_생성(String pickeatCode, WishRestaurantRequest request, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/pickeats/{pickeatCode}/restaurants/wish", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }
}
