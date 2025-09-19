package com.pickeat.backend.acceptance_test.piece.login;

import static org.hamcrest.Matchers.notNullValue;

import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.http.HttpStatus;

public class LoginPieceTest {

    public static TokenResponse 회원가입을_위한_코드_처리(AuthCodeRequest request) {
        return RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/auth/code")
                .then().log().all()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .body("token", notNullValue())
                .extract()
                .as(TokenResponse.class);
    }

    public static TokenResponse 로그인을_위한_코드_처리(AuthCodeRequest request) {
        return RestAssured
                .given().log().all()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/auth/code")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("token", notNullValue())
                .extract()
                .as(TokenResponse.class);
    }

    public static TokenResponse 로그인(String providerToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + providerToken)
                .when()
                .post("/api/v1/auth/login")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .body("token", notNullValue())
                .extract()
                .as(TokenResponse.class);
    }

    public static TokenResponse 회원가입(SignupRequest request, String providerToken) {
        return RestAssured
                .given().log().all()
                .header("Authorization", "Bearer " + providerToken)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/auth/signup")
                .then().log().all()
                .statusCode(HttpStatus.CREATED.value())
                .body("token", notNullValue())
                .extract()
                .as(TokenResponse.class);
    }
}
