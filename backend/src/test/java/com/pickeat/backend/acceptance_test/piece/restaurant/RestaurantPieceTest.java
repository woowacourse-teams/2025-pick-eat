package com.pickeat.backend.acceptance_test.piece.restaurant;

import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import java.util.List;
import org.springframework.http.HttpStatus;

public class RestaurantPieceTest {

    public static void 위치_기반으로_식당_생성(String pickeatCode, LocationRestaurantRequest request) {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/pickeats/{pickeatCode}/restaurants/location", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static void 위시리스트_기반으로_식당_생성(String pickeatCode, WishRestaurantRequest request) {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/pickeats/{pickeatCode}/restaurants/wish", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static List<RestaurantResponse> 픽잇의_식당_조회(String pickeatCode, String token, Boolean isExcluded) {
        RequestSpecification request = RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token);

        if (isExcluded != null) {
            request.queryParam("isExcluded", isExcluded);
        }

        return request
                .when()
                .get("/api/v2/pickeats/{pickeatCode}/restaurants", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<RestaurantResponse>>() {
                });
    }
//    public static List<RestaurantResponse> 픽잇의_식당_조회(String pickeatCode, String token, Boolean isExcluded) {
//        return RestAssured.given().log().all()
//                .header("Pickeat-Participant-Token", "Bearer " + token)
//                .queryParam("isExcluded", isExcluded)
//                .when()
//                .get("/api/v1/pickeats/{pickeatCode}/restaurants", pickeatCode)
//                .then().log().all()
//                .statusCode(HttpStatus.OK.value())
//                .extract().body().jsonPath().getList(".", RestaurantResponse.class);
//    }

    public static void 식당_소거(RestaurantExcludeRequest request, String token) {
        RestAssured.given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .patch("/api/v1/restaurants/exclude")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void 식당_좋아요(Long restaurantId, String token) {
        RestAssured.given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token)
                .when()
                .patch("/api/v1/restaurants/{restaurantId}/like", restaurantId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void 식당_좋아요_취소(Long restaurantId, String token) {
        RestAssured.given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + token)
                .when()
                .patch("/api/v1/restaurants/{restaurantId}/unlike", restaurantId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
