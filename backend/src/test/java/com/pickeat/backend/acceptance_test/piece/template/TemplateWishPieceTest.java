package com.pickeat.backend.tobe.acceptance_test.piece.template;

import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import io.restassured.RestAssured;
import io.restassured.common.mapper.TypeRef;
import org.springframework.http.HttpStatus;

import java.util.List;

public class TemplateWishPieceTest {

    public static List<TemplateWishResponse> 템플릿_소원_목록_조회(Long templateId) {
        return RestAssured
                .given().log().all()
                .when()
                .get("/api/v1/templates/{templateId}/wishes", templateId)
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(new TypeRef<List<TemplateWishResponse>>() {});
    }
}