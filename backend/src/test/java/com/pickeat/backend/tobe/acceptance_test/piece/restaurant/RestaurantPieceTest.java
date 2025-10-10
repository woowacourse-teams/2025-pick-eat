package com.pickeat.backend.tobe.acceptance_test.piece.restaurant;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.tobe.restaurant.application.dto.request.WishRestaurantRequest;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import java.util.List;
import org.springframework.http.HttpStatus;

public class RestaurantPieceTest {

    public static void 위치_기반_식당_생성(String pickeatCode, LocationRestaurantRequest request) {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/pickeats/{pickeatCode}/restaurants/location", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static void 위시_기반_식당_생성(String pickeatCode, WishRestaurantRequest request) {
        RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/pickeats/{pickeatCode}/restaurants/wish", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static void 식당_제외(RestaurantExcludeRequest request, String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .patch("/api/v2/restaurants/exclude")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void 식당_좋아요(Long restaurantId, String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v2/restaurants/{restaurantId}/like", restaurantId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void 식당_좋아요_취소(Long restaurantId, String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v2/restaurants/{restaurantId}/unlike", restaurantId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static List<RestaurantResponse> 픽잇의_식당_조회(String pickeatCode, Boolean isExcluded, String participantToken) {
        return RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .queryParam("isExcluded", isExcluded)
                .when()
                .get("/api/v2/pickeats/{pickeatCode}/restaurants", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<RestaurantResponse>>() {
                });
    }
}
