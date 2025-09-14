package com.pickeat.backend.acceptance_test.piece.restaurant;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

import java.util.List;

public class RestaurantPieceTest {

    public static void createRestaurantsByLocation(String pickeatCode, LocationRestaurantRequest request) {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/pickeats/{pickeatCode}/restaurants/location", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static List<RestaurantResponse> getPickeatRestaurants(String pickeatCode, String token, Boolean isExcluded) {
        return RestAssured.given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token)
                .queryParam("isExcluded", isExcluded)
                .when()
                .get("/api/v1/pickeats/{pickeatCode}/restaurants", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract().body().jsonPath().getList(".", RestaurantResponse.class);
    }

    public static void excludeRestaurants(RestaurantExcludeRequest request, String token) {
        RestAssured.given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .patch("/api/v1/restaurants/exclude")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
