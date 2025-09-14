package com.pickeat.backend.acceptance_test.piece.restaurant;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class RestaurantPieceTest {

    public static void createRestaurantsByLocation(String pickeatCode, LocationRestaurantRequest request) {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/pickeats/{pickeatCode}/restaurants/location", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }
}
