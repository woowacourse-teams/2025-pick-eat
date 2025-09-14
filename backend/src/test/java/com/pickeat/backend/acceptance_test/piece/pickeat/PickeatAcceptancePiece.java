package com.pickeat.backend.acceptance_test.piece.pickeat;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class PickeatAcceptancePiece {

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
}
