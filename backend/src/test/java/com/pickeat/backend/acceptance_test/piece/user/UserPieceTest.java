package com.pickeat.backend.acceptance_test.piece.user;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.user.application.dto.UserResponse;
import io.restassured.RestAssured;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpStatus;

public class UserPieceTest {

    public static List<UserResponse> 유저_검색(String nickname) {
        UserResponse[] response = RestAssured
                .given().log().all()
                .queryParam("nickname", nickname)
                .when()
                .get("/api/v1/users/search")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("$", notNullValue())
                .extract()
                .as(UserResponse[].class);
        return Arrays.asList(response);
    }
}
