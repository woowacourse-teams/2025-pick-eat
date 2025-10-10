package com.pickeat.backend.tobe.acceptance_test.piece.user;

import com.pickeat.backend.tobe.user.application.dto.UserResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import org.springframework.http.HttpStatus;

import java.util.List;

public class UserPieceTest {

    public static UserResponse 내_정보_조회(String accessToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + accessToken)
                .when()
                .get("/api/v2/users")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(UserResponse.class);
    }

    public static List<UserResponse> 방_유저_목록_조회(Long roomId) {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v2/rooms/{roomId}/users", roomId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<UserResponse>>() {});
    }

    public static List<UserResponse> 유저_검색(String nickname) {
        return RestAssured
                .given().log().all()
                .queryParam("nickname", nickname)
                .when()
                .get("/api/v2/users/search")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<UserResponse>>() {});
    }
}