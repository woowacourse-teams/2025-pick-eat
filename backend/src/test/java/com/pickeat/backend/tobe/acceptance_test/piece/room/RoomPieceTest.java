package com.pickeat.backend.tobe.acceptance_test.piece.room;

import com.pickeat.backend.tobe.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.tobe.room.application.dto.request.RoomRequest;
import com.pickeat.backend.tobe.room.application.dto.response.RoomResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

import java.util.List;

public class RoomPieceTest {

    public static RoomResponse 방_생성(RoomRequest request, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/rooms")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .extract()
                .as(RoomResponse.class);
    }

    public static RoomResponse 방_단일_조회(Long roomId, String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v2/rooms/{roomId}", roomId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(RoomResponse.class);
    }

    public static List<RoomResponse> 방_전체_조회(String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v2/rooms")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<RoomResponse>>() {});
    }

    public static void 방_초대(Long roomId, RoomInvitationRequest request, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v2/rooms/{roomId}/invite", roomId)
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value());
    }

    public static void 방_나가기(Long roomId, String accessToken) {
        RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .delete("/api/v2/rooms/{roomId}/exit", roomId)
                .then().log().all()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }
}
