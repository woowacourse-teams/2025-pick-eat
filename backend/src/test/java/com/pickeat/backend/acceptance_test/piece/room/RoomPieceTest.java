package com.pickeat.backend.acceptance_test.piece.room;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class RoomPieceTest {

    public static RoomResponse 방_생성(RoomRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/rooms")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("id", notNullValue())
                .body("name", notNullValue())
                .body("userCount", notNullValue())
                .extract()
                .as(RoomResponse.class);
    }

    public static void 방_초대(Long roomId, RoomInvitationRequest request, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/rooms/{roomId}/invite", roomId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static RoomResponse 방_정보_조회(Long roomId, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v1/rooms/{roomId}", roomId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("id", notNullValue())
                .body("name", notNullValue())
                .body("userCount", notNullValue())
                .extract()
                .as(RoomResponse.class);
    }
}
