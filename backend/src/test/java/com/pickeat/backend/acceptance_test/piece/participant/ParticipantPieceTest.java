package com.pickeat.backend.acceptance_test.piece.participant;

import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

import static org.hamcrest.Matchers.notNullValue;

public class ParticipantPieceTest {

    public static TokenResponse createParticipant(ParticipantRequest request) {
        return RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/participants")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("token", notNullValue())
                .extract()
                .as(TokenResponse.class);
    }

    public static void markCompletion(String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v1/participants/me/completion/complete")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void unMarkCompletion(String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v1/participants/me/completion/cancel")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
