package com.pickeat.backend.acceptance_test.piece.template;

import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import java.util.List;
import org.springframework.http.HttpStatus;

public class TemplatePieceTest {

    public static List<TemplateResponse> 템플릿_목록_조회() {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/templates")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<TemplateResponse>>() {
                });
    }
}
