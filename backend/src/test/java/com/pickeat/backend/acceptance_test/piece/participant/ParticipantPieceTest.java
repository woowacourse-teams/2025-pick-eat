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
}
