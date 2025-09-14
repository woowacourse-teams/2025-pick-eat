package com.pickeat.backend.acceptance_test.piece.pickeat;

import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class PickeatPieceTest {

    public static PickeatResponse createPickeatWithoutRoom(PickeatRequest request) {
        return RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/pickeats")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", notNullValue())
                .body("code", notNullValue())
                .body("name", is(request.name()))
                .body("participantCount", is(0))
                .body("isActive", is(true))
                .extract()
                .as(PickeatResponse.class);
    }

    public static PickeatResponse getPickeat(String pickeatCode) {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/pickeats/{pickeatCode}", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("code", is(pickeatCode))
                .extract()
                .as(PickeatResponse.class);
    }

    public static void deactivatePickeat(String pickeatCode, String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v1/pickeats/{pickeatCode}/deactive", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static PickeatStateResponse getPickeatState(String pickeatCode) {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/pickeats/{pickeatCode}/state", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(PickeatStateResponse.class);
    }

    public static RestaurantResultResponse createPickeatResult(String pickeatCode, String participantToken) {
        return RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .post("/api/v1/pickeats/{pickeatCode}/result", pickeatCode)
                .then().log().all()
                .statusCode(anyOf(is(HttpStatus.CREATED.value()), is(HttpStatus.OK.value())))
                .extract()
                .as(RestaurantResultResponse.class);
    }

    public static RestaurantResultResponse getPickeatResult(String pickeatCode, String participantToken) {
        return RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .get("/api/v1/pickeats/{pickeatCode}/result", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(RestaurantResultResponse.class);
    }

    public static ParticipantStateResponse getParticipantStateSummary(String pickeatCode) {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/pickeats/{pickeatCode}/participants/state", pickeatCode)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ParticipantStateResponse.class);
    }
}
