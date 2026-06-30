package com.pickeat.backend.acceptance_test.piece.participant;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class ParticipantPieceTest {

    public static TokenResponse 참가자_생성(ParticipantRequest request) {
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

    public static ParticipantResponse 참가자_정보_조회(String participantToken) {
        return RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .get("/api/v1/participants/me")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(ParticipantResponse.class);
    }

    public static void 참가자_선택_완료_표시(String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v1/participants/me/completion/complete")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    public static void 참가자_선택_완료_표시_취소(String participantToken) {
        RestAssured
                .given().log().all()
                .header("Pickeat-Participant-Token", "Bearer " + participantToken)
                .when()
                .patch("/api/v1/participants/me/completion/cancel")
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
